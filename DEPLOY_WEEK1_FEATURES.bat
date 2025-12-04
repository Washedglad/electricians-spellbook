@echo off
cls
echo.
echo   ═══════════════════════════════════════════════════════
echo     ⚡ DEPLOYING WEEK 1 QOL FEATURES ✨
echo   ═══════════════════════════════════════════════════════
echo.
echo   NEW FEATURES:
echo   1. 🌓 Lumos/Nox Theme Toggle (Dark/Light Mode)
echo   2. 🔍 Accio Search (Global Search - Ctrl+K)
echo   3. ⭐ Favorites System (Context ready)
echo.
echo   Plus previous features:
echo   • 🪄 Magical wand sounds
echo   • 📜 25 diverse HP quotes
echo   • 📖 30 NEC code references
echo   • 📊 4 reference tables
echo.
echo   ═══════════════════════════════════════════════════════
echo.

cd /d "%~dp0"

echo   [1/3] Adding files to git...
git add .

echo.
echo   [2/3] Committing changes...
git commit -m "Week 1 Features: Lumos/Nox theme toggle, Accio global search (Ctrl+K), Favorites context"

echo.
echo   [3/3] Pushing to GitHub...
git push

echo.
echo   ═══════════════════════════════════════════════════════
echo     ✅ DEPLOYMENT COMPLETE!
echo   ═══════════════════════════════════════════════════════
echo.
echo   NEW FEATURES TO TEST:
echo   ✓ Click Sun/Moon icon in header to toggle theme
echo   ✓ Press Ctrl+K anywhere to open global search
echo   ✓ Click search icon in header
echo   ✓ Search works across Quests, Materials, Codes, etc.
echo   ✓ Arrow keys to navigate search results
echo   ✓ Enter to select, Esc to close
echo.
echo   Check your Vercel dashboard for build status!
echo.
echo   ═══════════════════════════════════════════════════════
pause

