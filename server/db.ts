// From blueprint:javascript_database
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Convert to pooled endpoint for better deployment reliability
// Neon provides pooled endpoints that work better with serverless/deployments
function getPooledConnectionString(connectionString: string): string {
  // If already using pooled endpoint, return as-is
  if (connectionString.includes('-pooler.')) {
    return connectionString;
  }
  
  // Convert direct endpoint to pooled endpoint
  // Example: ep-abc-123.aws.neon.tech -> ep-abc-123-pooler.aws.neon.tech
  return connectionString.replace(
    /(@[^.]+)(\.aws\.neon\.tech)/,
    '$1-pooler$2'
  );
}

const connectionString = getPooledConnectionString(process.env.DATABASE_URL);

// Production-ready pool configuration with retry logic
const poolConfig = {
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 10, // Max connections in pool
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 15000, // Wait 15s for connection (increased for DNS retries)
  application_name: 'fs-exam-guide',
};

// Create connection pool with retry logic for DNS failures
async function createPoolWithRetry(maxRetries = 5): Promise<Pool> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const pool = new Pool(poolConfig);
      
      // Test the connection
      await pool.query('SELECT NOW()');
      
      if (attempt > 1) {
        console.log(`✅ Database connected successfully (attempt ${attempt}/${maxRetries})`);
      }
      
      return pool;
    } catch (error: any) {
      console.error(`❌ Database connection attempt ${attempt}/${maxRetries} failed:`, error.message);
      
      // If this was the last retry, throw the error
      if (attempt === maxRetries) {
        throw new Error(
          `Failed to connect to database after ${maxRetries} attempts. ` +
          `Last error: ${error.message}. ` +
          `Please check your DATABASE_URL and network connectivity.`
        );
      }
      
      // Exponential backoff: 1s, 2s, 4s, 8s
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
      console.log(`⏳ Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // This should never be reached, but TypeScript needs it
  throw new Error('Unexpected error in connection retry logic');
}

// Initialize pool (will be created on first use)
let poolInstance: Pool | null = null;

// Get or create pool with retry logic
async function getPool(): Promise<Pool> {
  if (!poolInstance) {
    poolInstance = await createPoolWithRetry();
    
    // Handle pool errors gracefully
    poolInstance.on('error', (err) => {
      console.error('Unexpected database pool error:', err);
      // Don't exit - let retry logic handle reconnection
    });
  }
  return poolInstance;
}

// Export synchronous pool for immediate use (development)
// In production, the retry logic will handle connection issues
export const pool = new Pool(poolConfig);

// Export async pool getter for critical operations
export const getPoolSafely = getPool;

export const db = drizzle({ client: pool, schema });
