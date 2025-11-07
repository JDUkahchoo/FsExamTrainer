# 🚀 Setup Guide: FS Exam Study Guide version 2

## Quick Start (15 minutes total)

### Step 1: Create New Repl in Your Team Account (2 min)

1. Go to https://replit.com
2. Click **"Create Repl"**
3. Select your **Team workspace** (important!)
4. Choose template: **"Node.js"**
5. Name it: **"FS Exam Study Guide version 2"**
6. Click **"Create Repl"**

### Step 2: Enable PostgreSQL Database (1 min)

1. In your new Repl, press **Ctrl+K** (or Cmd+K)
2. Type: **"Database"**
3. Click **"Add PostgreSQL Database"**
4. Done! Database credentials are automatically added to environment variables

### Step 3: Transfer Code from Old Repl (5 min)

**Option A: Download & Upload (Easiest)**
1. In OLD Repl: Click ⋮ menu → **"Download as zip"**
2. Extract the zip file
3. In NEW Repl: Drag and drop all folders/files into the file tree
4. Overwrite when prompted

**Option B: Manual Copy (if download doesn't work)**
1. Open both Repls in separate browser tabs
2. Copy these folders from old → new:
   - `client/` (entire folder)
   - `server/` (entire folder)
   - `shared/` (entire folder)
   - Root files: `package.json`, `vite.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `drizzle.config.ts`

### Step 4: Install Dependencies & Setup Database (3 min)

In the new Repl's **Shell**, run these commands:

```bash
# Install all packages
npm install

# Create database tables
npm run db:push --force

# Load your 50 lesson questions
tsx server/load-lessons.ts
```

You should see:
```
✅ Database schema created!
📚 Loading 10 lessons with 50 questions...
✅ Loaded Domain 7: Algebra and Equation Solving
✅ Loaded Domain 7: Geometry: Areas and Volumes
... (8 more)
🎉 All 50 questions loaded successfully!
```

### Step 5: Test Locally (2 min)

1. Click the **"Run"** button (or `npm run dev` in Shell)
2. Wait for: "serving on port 5000"
3. Click the preview URL
4. Try logging in with Replit Auth
5. Navigate to Interactive Lessons
6. Verify you see all 10 lessons

### Step 6: Deploy to Production (2 min)

1. Press **Ctrl+K** and type **"Publishing"**
2. Select **"Autoscale"**
3. Verify settings:
   - **Build command**: `npm run build`
   - **Run command**: `npm run start`
4. Click **"Deploy"**
5. Wait ~2-3 minutes for deployment

### Step 7: Test on iPad! 🎉

1. Open the deployment URL on your iPad
2. Login with Replit Auth
3. Go to Interactive Lessons
4. Try a few lessons and see the step-by-step solutions!

---

## ✅ What You Get

- ✨ Fresh database with no endpoint issues
- 🔧 Clean `.replit` config (single port, no conflicts)
- 📚 All 10 lessons with 50 detailed questions
- 🚀 Ready to deploy immediately
- 🎯 No team transfer baggage

---

## 🆘 Troubleshooting

**Problem: "Cannot find package"**
- Solution: Run `npm install` again

**Problem: "Table already exists" when running db:push**
- Solution: That's fine! It means tables were already created. Skip to loading lessons.

**Problem: "tsx command not found"**
- Solution: Run `npm install` first

**Problem: Deployment fails with port error**
- Solution: The new Repl should have clean config, but if needed, edit `.replit` file and keep only:
  ```toml
  [[ports]]
  localPort = 5000
  externalPort = 80
  ```

---

## 📦 Files Included

The setup includes one file you'll need to copy to your new Repl:
- `server/load-lessons.ts` - Script to load all 50 questions

Everything else comes from the code transfer in Step 3.

---

**Ready? Create that new Repl and let's get your lessons deployed!** 🚀
