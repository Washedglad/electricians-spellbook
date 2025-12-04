# 🔮 Git Repository Setup Guide
## The Electrician's Spellbook

This guide will walk you through setting up Git and pushing your project to GitHub.

---

## 📋 Prerequisites

### 1. Install Git for Windows

**Check if Git is already installed:**
```bash
git --version
```

**If not installed, download from:**
- https://git-scm.com/download/win
- Or use: https://gitforwindows.org/

**Installation Tips:**
- ✅ Use default settings
- ✅ Select "Git from the command line and also from 3rd-party software"
- ✅ Use the default branch name "main"
- ✅ Select "Checkout as-is, commit Unix-style line endings"

### 2. Create a GitHub Account

If you don't have one already:
1. Go to https://github.com
2. Click "Sign up"
3. Follow the registration process

---

## 🚀 Step-by-Step Setup

### Step 1: Configure Git (First Time Only)

Open PowerShell or Command Prompt in your project folder and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "John Smith"
git config --global user.email "john@example.com"
```

**Verify configuration:**
```bash
git config --list
```

---

### Step 2: Initialize Git Repository

Navigate to your project folder:
```bash
cd c:\Users\avery\Documents\electricians-spellbook
```

Initialize Git:
```bash
git init
```

You should see: `Initialized empty Git repository in...`

---

### Step 3: Add Files to Git

**Add all files:**
```bash
git add .
```

**Check what will be committed:**
```bash
git status
```

You should see all your files listed in green.

---

### Step 4: Create Your First Commit

```bash
git commit -m "Initial commit - The Electrician's Spellbook"
```

**Success message should appear with file counts.**

---

### Step 5: Create GitHub Repository

**Option A: Using GitHub Website (Recommended for Beginners)**

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `electricians-spellbook`
   - **Description**: "A Harry Potter themed web app for electricians"
   - **Visibility**: Public or Private (your choice)
   - ⚠️ **DO NOT** check "Add a README file"
   - ⚠️ **DO NOT** add .gitignore or license (we already have them)
5. Click "Create repository"

**Option B: Using GitHub CLI (Advanced)**

```bash
# Install GitHub CLI first from: https://cli.github.com/
gh auth login
gh repo create electricians-spellbook --public --source=. --remote=origin --push
```

---

### Step 6: Connect Local Repository to GitHub

After creating the GitHub repository, copy the commands shown on GitHub, or use these:

**Replace `YOUR-USERNAME` with your actual GitHub username:**

```bash
git remote add origin https://github.com/YOUR-USERNAME/electricians-spellbook.git
```

**Verify the remote:**
```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR-USERNAME/electricians-spellbook.git (fetch)
origin  https://github.com/YOUR-USERNAME/electricians-spellbook.git (push)
```

---

### Step 7: Set Default Branch to Main

```bash
git branch -M main
```

---

### Step 8: Push to GitHub

**First push:**
```bash
git push -u origin main
```

**You'll be prompted to authenticate:**
- Enter your GitHub username
- For password, use a **Personal Access Token** (not your actual password)

**Creating a Personal Access Token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Electrician's Spellbook"
4. Select expiration (recommend 90 days)
5. Check these scopes:
   - ✅ `repo` (Full control of private repositories)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)
8. Use this token as your password when pushing

**Success!** Your code is now on GitHub! 🎉

---

## 🔄 Regular Workflow

### After Making Changes

**1. Check what changed:**
```bash
git status
```

**2. Add changes:**
```bash
# Add all changes
git add .

# Or add specific files
git add src/pages/HomePage.tsx
```

**3. Commit changes:**
```bash
git commit -m "Add new calculator feature"
```

**4. Push to GitHub:**
```bash
git push
```

---

## 💡 Useful Git Commands

### Check Status
```bash
git status
```
Shows modified, staged, and untracked files.

### View Commit History
```bash
git log
```
Press `q` to exit.

### View Shortened History
```bash
git log --oneline
```

### See Changes Before Committing
```bash
git diff
```

### Undo Uncommitted Changes
```bash
# Undo changes to a specific file
git checkout -- filename.txt

# Undo all changes (⚠️ careful!)
git reset --hard
```

### Create a New Branch
```bash
git checkout -b feature-name
```

### Switch Branches
```bash
git checkout main
```

### Merge Branch into Main
```bash
git checkout main
git merge feature-name
```

### Pull Latest Changes
```bash
git pull
```

---

## 📝 Commit Message Best Practices

### Good Commit Messages:
```bash
git commit -m "Add PLC I/O calculator"
git commit -m "Fix voltage drop calculation bug"
git commit -m "Update README with installation steps"
git commit -m "Improve mobile responsiveness for calculator page"
```

### Bad Commit Messages (Avoid):
```bash
git commit -m "update"
git commit -m "fix"
git commit -m "asdfasdf"
git commit -m "changes"
```

### Message Format:
- Start with a verb (Add, Fix, Update, Remove, Improve)
- Be specific but concise
- Use present tense ("Add feature" not "Added feature")

---

## 🌿 Branching Strategy (Optional)

For larger features or experiments:

**Create feature branch:**
```bash
git checkout -b feature/low-voltage-calculators
```

**Work on your feature, commit changes:**
```bash
git add .
git commit -m "Add PoE calculator"
```

**Push feature branch:**
```bash
git push -u origin feature/low-voltage-calculators
```

**When ready, merge to main:**
```bash
git checkout main
git merge feature/low-voltage-calculators
git push
```

**Delete feature branch (optional):**
```bash
git branch -d feature/low-voltage-calculators
git push origin --delete feature/low-voltage-calculators
```

---

## 🆘 Troubleshooting

### "git: command not found"
- Git is not installed or not in PATH
- Install Git for Windows
- Restart terminal after installation

### "failed to push some refs"
Someone else pushed changes, or you're behind:
```bash
git pull --rebase
git push
```

### "Permission denied (publickey)"
Your SSH key isn't set up. Use HTTPS instead:
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/electricians-spellbook.git
```

### Accidentally Committed Sensitive Data
```bash
# Remove from last commit (if not pushed yet)
git reset HEAD~1
# Remove the sensitive file, then recommit
```

### Want to Start Over
```bash
# ⚠️ This deletes all uncommitted changes!
git reset --hard HEAD
```

---

## 🔐 Security Best Practices

### Never Commit:
- ❌ API keys
- ❌ Passwords
- ❌ Personal access tokens
- ❌ `.env` files with secrets
- ❌ `node_modules` folder (already in .gitignore)

### Always:
- ✅ Use `.gitignore` (already included)
- ✅ Review changes before committing (`git diff`)
- ✅ Use meaningful commit messages
- ✅ Keep credentials in environment variables

---

## 📊 Viewing Your Repository

After pushing, visit:
```
https://github.com/YOUR-USERNAME/electricians-spellbook
```

You'll see:
- ✅ All your code
- ✅ README.md displayed on the homepage
- ✅ Commit history
- ✅ File browser

---

## 🚀 Quick Reference Card

```bash
# Setup (once)
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main

# Daily workflow
git status                    # Check what changed
git add .                     # Stage all changes
git commit -m "Description"   # Commit changes
git push                      # Push to GitHub

# Pull latest
git pull                      # Get latest changes

# Branching
git checkout -b feature-name  # Create and switch to new branch
git checkout main             # Switch back to main
git merge feature-name        # Merge branch into current branch
```

---

## 🎯 Next Steps

After setting up Git:

1. ✅ Make your repository public or private
2. ✅ Add a nice repository description
3. ✅ Add topics: `react`, `typescript`, `electrical`, `calculators`, `vite`
4. ✅ Enable GitHub Pages for free hosting (optional)
5. ✅ Add collaborators if working with others
6. ✅ Set up GitHub Actions for CI/CD (advanced)

---

## 📱 GitHub Desktop (Alternative)

Prefer a GUI? Download GitHub Desktop:
- https://desktop.github.com/

**Steps with GitHub Desktop:**
1. Install GitHub Desktop
2. Sign in to GitHub
3. File → Add Local Repository
4. Select your project folder
5. Click "Publish repository"
6. Done! Use the GUI for commits and pushes

---

## 🎓 Learning Resources

- **Git Basics**: https://git-scm.com/book/en/v2
- **GitHub Guides**: https://guides.github.com/
- **Interactive Tutorial**: https://learngitbranching.js.org/
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf

---

## ✨ Git Aliases (Optional Time-Savers)

Add these to make Git commands shorter:

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
```

Now you can use:
```bash
git st          # instead of git status
git co main     # instead of git checkout main
git ci -m "msg" # instead of git commit -m "msg"
```

---

## 🎉 Congratulations!

You now have your Electrician's Spellbook safely stored on GitHub!

Your magical electrical companion is now:
- ✅ Version controlled
- ✅ Backed up in the cloud
- ✅ Shareable with others
- ✅ Ready for collaboration
- ✅ Portfolio-ready

**Pro Tip:** Add a link to your GitHub repo on your resume! 💼

---

*"It matters not what someone is born, but what they grow to be."* - Albus Dumbledore

Now grow your Git skills and share your magical creation! ⚡✨

**Need help?** Open an issue on your GitHub repository or check the troubleshooting section above.

