# 🔧 Troubleshooting Guide
## The Electrician's Spellbook

---

## 🚨 Vercel Deployment Issues

### Build Failed - "Vercel Ready Fix"

If your Vercel deployment is failing, here's how to diagnose and fix:

#### 1. Check the Build Logs

**In Vercel Dashboard:**
1. Go to your deployment
2. Click on the failed deployment
3. Click "Build Logs"
4. Look for the specific error

**Common Build Errors:**

**Error: "Cannot find module"**
```bash
# Missing dependency - add it locally and commit
npm install [missing-package]
git add package.json package-lock.json
git commit -m "Fix: Add missing dependency"
git push
```

**Error: "TypeScript errors"**
```bash
# Fix TypeScript errors locally first
npm run build
# Fix any errors shown
git add .
git commit -m "Fix: Resolve TypeScript errors"
git push
```

**Error: "Command failed: npm run build"**
```bash
# Test build locally
npm run build

# If it works locally but fails on Vercel:
# Check Node.js version
# Vercel uses Node 18 by default
```

#### 2. Fix Node Version Issues

Add to `package.json`:
```json
{
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

Commit and push:
```bash
git add package.json
git commit -m "Fix: Specify Node.js version"
git push
```

#### 3. Clear Vercel Cache

Sometimes Vercel's cache causes issues:

**Via Dashboard:**
1. Go to Project Settings
2. Click "Clear Cache"
3. Redeploy

**Via CLI:**
```bash
vercel --prod --force
```

---

## 📝 Git Commit Message Issues

### Wrong Commit Message (like "Initial commit" when it's not)

**If you haven't pushed yet:**
```bash
# Change the last commit message
git commit --amend -m "Fix: Add low voltage calculators and Vercel config"
```

**If you already pushed:**
```bash
# Change last commit message
git commit --amend -m "Fix: Add low voltage calculators and Vercel config"

# Force push (⚠️ only if you're the only one working on this repo)
git push --force
```

**For future commits, use better messages:**
```bash
# Good commit messages:
git commit -m "Fix: Resolve TypeScript errors in calculator"
git commit -m "Add: Low voltage and PLC calculators"
git commit -m "Update: Vercel configuration for deployment"
git commit -m "Fix: Button styling on mobile devices"
```

---

## 🔍 Common Issues & Solutions

### Issue: "Failed to compile"

**Symptoms:** Vercel build fails with compilation errors

**Solution:**
```bash
# 1. Clean install
rm -rf node_modules package-lock.json
npm install

# 2. Test build locally
npm run build

# 3. Fix any errors shown

# 4. Commit and push
git add .
git commit -m "Fix: Resolve compilation errors"
git push
```

---

### Issue: "Module not found"

**Symptoms:** Error says it can't find a module like `date-fns` or `framer-motion`

**Solution:**
```bash
# Install the missing package
npm install date-fns framer-motion zustand

# Commit the updated package files
git add package.json package-lock.json
git commit -m "Fix: Add missing dependencies"
git push
```

---

### Issue: "Page shows blank after deployment"

**Symptoms:** Builds successfully but page is blank

**Solution:**

1. **Check browser console (F12)**
   - Look for JavaScript errors
   - Fix any errors in your code

2. **Check routing configuration**
   - Verify `vercel.json` has the rewrite rule
   - Should already be there:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

3. **Check base path in vite.config.ts**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/', // Make sure this is '/' not something else
   })
   ```

---

### Issue: "Import errors" or "Cannot resolve path"

**Symptoms:** Errors about `@/` imports not working

**Solution:**

Check `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Check `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### Issue: "Zustand persist middleware error"

**Symptoms:** Error about zustand/middleware

**Solution:**
```bash
# Update the import
# Change from:
import { persist } from 'zustand/middleware'

# To:
import { persist, createJSONStorage } from 'zustand/middleware'

# Or install specific version
npm install zustand@^4.4.7

git add .
git commit -m "Fix: Update Zustand middleware import"
git push
```

---

### Issue: Deployment succeeds but features don't work

**Symptoms:** App loads but calculators/features broken

**Check:**

1. **Browser console (F12)** for JavaScript errors
2. **LocalStorage** - make sure it's not disabled
3. **Test in incognito mode** - rules out extension issues

**Common fixes:**
```bash
# Rebuild with fresh dependencies
rm -rf node_modules package-lock.json dist
npm install
npm run build

# Test locally
npm run preview

# If works locally, redeploy
git add .
git commit -m "Fix: Rebuild with fresh dependencies"
git push
```

---

## 🛠️ Quick Fixes

### Fix: Start Fresh with Vercel

If everything is broken:

1. **Delete Vercel project**
   - Go to Vercel dashboard
   - Settings → Delete Project

2. **Reimport from GitHub**
   - Add New Project
   - Import your repo
   - Deploy

### Fix: Reset Git History (Nuclear Option)

⚠️ **WARNING: This deletes all commit history!**

```bash
# Backup first!
cp -r electricians-spellbook electricians-spellbook-backup

# Delete .git folder
rm -rf .git

# Start fresh
git init
git add .
git commit -m "Initial commit - The Electrician's Spellbook"

# Force push to GitHub (this overwrites everything)
git remote add origin https://github.com/YOUR-USERNAME/electricians-spellbook.git
git branch -M main
git push -u origin main --force
```

---

## 📊 Diagnostic Commands

Run these to check your setup:

```bash
# Check Node version
node --version
# Should be 18.x or higher

# Check npm version
npm --version
# Should be 9.x or higher

# Check Git status
git status

# Check remote
git remote -v

# Test build
npm run build

# Test preview
npm run preview

# Check for outdated packages
npm outdated

# Update all packages (careful!)
npm update
```

---

## 🔄 Complete Reset Procedure

If nothing else works:

```bash
# 1. Save your work
# Make sure all files are saved!

# 2. Clean everything
rm -rf node_modules
rm -rf dist
rm package-lock.json

# 3. Fresh install
npm install

# 4. Test build
npm run build

# 5. Test preview
npm run preview

# 6. If working, commit
git add .
git commit -m "Fix: Clean reinstall of dependencies"
git push

# 7. Vercel will auto-deploy
```

---

## 📞 Still Having Issues?

### Get Help

1. **Check Vercel Status**
   - https://www.vercel-status.com/

2. **Review Build Logs**
   - Most errors are in the build logs
   - Read carefully, they usually tell you exactly what's wrong

3. **Test Locally First**
   ```bash
   npm run build
   npm run preview
   ```
   If it doesn't work locally, it won't work on Vercel

4. **Check Package Versions**
   ```bash
   npm list
   ```
   Make sure all packages are compatible

5. **Ask for Help**
   - Vercel Discord: https://vercel.com/discord
   - GitHub Issues in your repo
   - Stack Overflow with error message

---

## ✅ Deployment Success Checklist

Before considering it "fixed":

- [ ] Local build works: `npm run build`
- [ ] Local preview works: `npm run preview`
- [ ] No TypeScript errors
- [ ] No console errors (F12)
- [ ] All dependencies in package.json
- [ ] Committed and pushed to GitHub
- [ ] Vercel build succeeded
- [ ] Live site loads
- [ ] All features work on live site
- [ ] Mobile responsive
- [ ] No errors in production console

---

## 🎯 Best Practices to Avoid Issues

1. **Always test builds locally** before pushing
   ```bash
   npm run build && npm run preview
   ```

2. **Commit working code** - don't commit broken code
   ```bash
   # Test first
   npm run build
   # Then commit
   git add .
   git commit -m "Descriptive message"
   git push
   ```

3. **Use meaningful commit messages**
   - Not: "fix", "update", "changes"
   - Yes: "Fix: Resolve TypeScript errors in calculator component"

4. **Keep dependencies updated** (but carefully)
   ```bash
   npm outdated
   npm update
   ```

5. **Don't commit node_modules** (already in .gitignore)

6. **Test after every Vercel deployment**
   - Don't assume it worked
   - Actually test the live site

---

*"It is our choices that show what we truly are, far more than our abilities."* - Albus Dumbledore

Choose to debug systematically! ⚡🔧

**Most issues can be fixed by testing locally first!**

