@echo off
echo ========================================
echo Backend Learning Journey - Getting Started
echo ========================================
echo.

echo [1/4] Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found
    echo.
    echo Please install Node.js first:
    echo 1. Go to https://nodejs.org
    echo 2. Download the LTS version
    echo 3. Install it
    echo 4. Restart this script
    echo.
    pause
    exit /b 1
) else (
    echo ✓ Node.js is installed
    node --version
)

echo.
echo [2/4] Creating learning project directory...
if not exist "backend-learning" mkdir backend-learning
cd backend-learning
echo ✓ Learning directory created

echo.
echo [3/4] Setting up your first Node.js project...
npm init -y
echo ✓ Package.json created

echo.
echo [4/4] Installing Express.js...
npm install express
echo ✓ Express.js installed

echo.
echo ========================================
echo Your First Backend Project is Ready! 🚀
echo ========================================
echo.
echo Next steps:
echo 1. Open backend-learning folder in your code editor
echo 2. Create a file called server.js
echo 3. Copy the code from BACKEND_LEARNING_GUIDE.md
echo 4. Run: node server.js
echo 5. Open http://localhost:3000 in your browser
echo.
echo Happy learning! 📚
echo.
pause
