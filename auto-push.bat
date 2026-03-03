@echo off
echo ====================================================
echo   Auto-Push to GitHub - Live Changes
echo ====================================================
echo.

:: Check for Git
git --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed or not in PATH!
    echo Please download and install Git from https://git-scm.com/
    pause
    exit /b
)

echo [1/3] Adding all new changes...
git add .
echo.

echo [2/3] Committing changes...
git commit -m "Auto-update from local: %date% %time%"
echo.

echo [3/3] Pushing changes to GitHub to make them live...
git push origin HEAD
echo.

echo ====================================================
echo   Done! Your changes will be live on GitHub Pages soon.
echo ====================================================
pause
