@echo off
echo ====================================
echo  Deploy to Vercel - The Electrician's Spellbook
echo ====================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org
    pause
    exit /b 1
)

:: Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing...
    npm install -g vercel
    echo.
)

echo Vercel CLI version:
vercel --version
echo.

echo ====================================
echo  Deployment Options:
echo ====================================
echo.
echo 1. Login to Vercel
echo 2. Deploy to Preview
echo 3. Deploy to Production
echo 4. View Project Status
echo 5. Exit
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto login
if "%choice%"=="2" goto preview
if "%choice%"=="3" goto production
if "%choice%"=="4" goto status
if "%choice%"=="5" goto end

:login
echo.
echo Logging in to Vercel...
vercel login
goto end

:preview
echo.
echo Building and deploying to Preview...
echo This creates a preview URL for testing.
echo.
vercel
goto end

:production
echo.
echo Building and deploying to Production...
echo This will be your live site!
echo.
vercel --prod
goto end

:status
echo.
echo Checking deployment status...
vercel ls
goto end

:end
echo.
echo ====================================
echo  Deployment Complete!
echo ====================================
echo.
echo Your URLs:
echo - Preview: https://electricians-spellbook-XXXXX.vercel.app
echo - Production: https://electricians-spellbook.vercel.app
echo.
echo Visit Vercel dashboard: https://vercel.com/dashboard
echo.
echo See VERCEL_DEPLOY.md for detailed instructions.
echo.
pause

