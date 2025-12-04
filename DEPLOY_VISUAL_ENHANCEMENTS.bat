@echo off
echo ============================================
echo  DEPLOYING VISUAL ENHANCEMENTS
echo ============================================
echo.

cd /d "%~dp0"

echo Adding files to git...
git add .

echo.
echo Committing changes...
git commit -m "Enhance: HP theme with rotating quotes, better readability, fix year to 2025"

echo.
echo Pushing to GitHub (this will trigger Vercel deployment)...
git push

echo.
echo ============================================
echo  DEPLOYMENT INITIATED!
echo ============================================
echo.
echo Your changes are being pushed to GitHub.
echo Vercel will automatically start building your app.
echo.
echo Check your Vercel dashboard for deployment status.
echo.
echo IMPROVEMENTS INCLUDED:
echo  - Fixed year: 2024 to 2025
echo  - Added 10 rotating Harry Potter quotes
echo  - Improved text readability (bright amber colors)
echo  - Beautiful animated footer
echo  - Enhanced quotes on every page
echo  - Better visual hierarchy
echo.
pause

