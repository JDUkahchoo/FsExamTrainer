/**
 * Script to re-enable a disabled Neon database endpoint
 * Run with: NEON_API_KEY=your_key tsx server/enable-neon-endpoint.ts
 */

// Parse the DATABASE_URL to extract project and endpoint IDs
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL not found in environment variables");
  process.exit(1);
}

// Extract endpoint from DATABASE_URL
// Format: postgres://user:password@ep-endpoint-id.region.aws.neon.tech/dbname
const match = databaseUrl.match(/ep-([a-z0-9-]+)/);
const endpointId = match ? `ep-${match[1]}` : null;

// Extract project ID from the host
// The host format is: ep-endpoint-id-project-id.region.aws.neon.tech
const hostMatch = databaseUrl.match(/@(ep-[a-z0-9-]+)\.([a-z0-9-]+)\.aws\.neon\.tech/);
const fullHost = hostMatch ? hostMatch[1] : null;

console.log("🔍 Database Connection Details:");
console.log(`DATABASE_URL: ${databaseUrl.replace(/:[^:@]+@/, ':****@')}`);
console.log(`Endpoint ID: ${endpointId || 'Not found'}`);

if (!endpointId) {
  console.error("\n❌ Could not extract endpoint ID from DATABASE_URL");
  console.error("Please check your DATABASE_URL format");
  process.exit(1);
}

const neonApiKey = process.env.NEON_API_KEY;

if (!neonApiKey) {
  console.log("\n📋 To fix the disabled endpoint, you need to:");
  console.log("\n1️⃣ Get your Neon API Key:");
  console.log("   • Go to: https://console.neon.tech");
  console.log("   • Navigate to: Account Settings → API Keys");
  console.log("   • Click 'Create new API key'");
  console.log("   • Copy the key");
  console.log("\n2️⃣ Add it to Replit Secrets:");
  console.log("   • Click the lock icon (🔒) in left sidebar");
  console.log("   • Add secret: NEON_API_KEY = (paste your key)");
  console.log("\n3️⃣ Run this script again:");
  console.log("   tsx server/enable-neon-endpoint.ts");
  console.log("\n💡 The endpoint should re-enable automatically!");
  process.exit(1);
}

// First, try to get project info from Neon API
console.log("\n🔍 Fetching your Neon projects...");

async function enableEndpoint() {
  try {
    // List all projects to find the right one
    const projectsResponse = await fetch('https://console.neon.tech/api/v2/projects', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${neonApiKey}`
      }
    });

    if (!projectsResponse.ok) {
      throw new Error(`Failed to fetch projects: ${projectsResponse.status} ${projectsResponse.statusText}`);
    }

    const projectsData = await projectsResponse.json();
    console.log(`✅ Found ${projectsData.projects?.length || 0} project(s)`);

    // Try to find the project that contains our endpoint
    let foundProject = null;
    for (const project of projectsData.projects || []) {
      const endpointsResponse = await fetch(
        `https://console.neon.tech/api/v2/projects/${project.id}/endpoints`,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${neonApiKey}`
          }
        }
      );

      if (endpointsResponse.ok) {
        const endpointsData = await endpointsResponse.json();
        const matchingEndpoint = endpointsData.endpoints?.find((ep: any) => ep.id === endpointId);
        
        if (matchingEndpoint) {
          foundProject = project;
          console.log(`\n✅ Found matching project: ${project.name || project.id}`);
          console.log(`   Project ID: ${project.id}`);
          console.log(`   Endpoint ID: ${matchingEndpoint.id}`);
          console.log(`   Endpoint Status: ${matchingEndpoint.disabled ? '❌ DISABLED' : '✅ ACTIVE'}`);
          
          if (matchingEndpoint.disabled) {
            console.log("\n🔄 Attempting to enable the endpoint...");
            
            // Enable the endpoint
            const startResponse = await fetch(
              `https://console.neon.tech/api/v2/projects/${project.id}/endpoints/${endpointId}/start`,
              {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${neonApiKey}`
                }
              }
            );

            if (startResponse.ok) {
              const startData = await startResponse.json();
              console.log("✅ Endpoint successfully enabled!");
              console.log("\n🎉 Your database should now be accessible!");
              console.log("🔄 Try logging in to your app again");
              return;
            } else {
              const errorData = await startResponse.json();
              console.error("❌ Failed to enable endpoint:", errorData);
            }
          } else {
            console.log("\n✅ Endpoint is already active!");
            console.log("The issue might be something else. Check:");
            console.log("  • Database permissions in team account");
            console.log("  • Environment variables are correctly set");
          }
          break;
        }
      }
    }

    if (!foundProject) {
      console.error("\n❌ Could not find a project matching your DATABASE_URL");
      console.error("This might mean:");
      console.error("  • The API key is for a different Neon account");
      console.error("  • The database was deleted");
      console.error("  • You need to recreate the database in your team account");
      console.log("\n💡 Recommended: Create a new database in your team's Replit workspace");
    }

  } catch (error) {
    console.error("\n❌ Error:", error);
    console.error("\nTroubleshooting:");
    console.error("  • Verify your NEON_API_KEY is correct");
    console.error("  • Check that the API key has the required permissions");
    console.error("  • Ensure you're using the API key from the correct Neon account");
  }
}

enableEndpoint().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
