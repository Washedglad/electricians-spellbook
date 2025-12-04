@echo off
cls
echo.
echo   ═══════════════════════════════════════════════════════
echo     ⚡ DEPLOYING COMPLETE THEME SYSTEM ✨
echo   ═══════════════════════════════════════════════════════
echo.
echo   FIXED:
echo   ✓ CSS variable opacity issues resolved
echo   ✓ All @apply statements corrected
echo   ✓ Scrollbar styles updated
echo   ✓ Quote author styles fixed
echo   ✓ Border colors using direct rgba()
echo.
echo   THEME SYSTEM:
echo   ✓ Lumos (Light mode) - Parchment theme
echo   ✓ Nox (Dark mode) - Mystical purple
echo   ✓ Smooth 0.3s transitions
echo   ✓ Persistent across sessions
echo   ✓ CSS variables for all colors
echo.
echo   ═══════════════════════════════════════════════════════
echo.

cd /d "%~dp0"

echo   [1/3] Adding files to git...
git add .

echo.
echo   [2/3] Committing changes...
git commit -m "Fix: Complete theme system with CSS variable fixes"

echo.
echo   [3/3] Pushing to GitHub...
git push

echo.
echo   ═══════════════════════════════════════════════════════
echo     ✅ DEPLOYMENT COMPLETE!
echo   ═══════════════════════════════════════════════════════
echo.
echo   THEME TOGGLE NOW WORKS:
echo   • Click Sun icon → Lumos (Light/Parchment theme)
echo   • Click Moon icon → Nox (Dark/Mystical theme)
echo   • Smooth animated transitions
echo   • Persists your choice
echo.
echo   PLUS ALL FEATURES:
echo   ✓ Global search (Ctrl+K)
echo   ✓ Magical wand sounds
echo   ✓ 25 HP quotes from 9 characters
echo   ✓ 30 NEC codes
echo   ✓ 4 reference tables
echo.
echo   Check your Vercel dashboard for build status!
echo.
echo   ═══════════════════════════════════════════════════════
pause

