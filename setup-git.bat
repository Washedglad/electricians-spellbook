@echo off
echo ====================================
echo  Git Setup for The Electrician's Spellbook
echo ====================================
echo.

:: Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo Git is installed! Version:
git --version
echo.

:: Check if already initialized
if exist .git (
    echo Git repository already initialized.
    echo.
    goto :status
)

:: Initialize repository
echo Initializing Git repository...
git init
echo.

:: Add all files
echo Adding files to Git...
git add .
echo.

:: Show status
:status
echo Current Git status:
git status
echo.

echo ====================================
echo  Next Steps:
echo ====================================
echo.
echo 1. Configure your Git identity (if not done already):
echo    git config --global user.name "Your Name"
echo    git config --global user.email "your.email@example.com"
echo.
echo 2. Create your first commit:
echo    git commit -m "Initial commit - The Electrician's Spellbook"
echo.
echo 3. Create a GitHub repository at: https://github.com/new
echo.
echo 4. Connect to GitHub:
echo    git remote add origin https://github.com/YOUR-USERNAME/electricians-spellbook.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo See GIT_SETUP_GUIDE.md for detailed instructions!
echo.
pause

