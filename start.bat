@echo off
title ProxyNameClaimer Web - Starter
echo ProxyNameClaimer Web - Starter
echo.
echo Checking Node.js installation...

where node >nul 2>nul
if %errorlevel% neq 0 (
  echo Node.js not found!
  echo Please install Node.js from https://nodejs.org/
  echo Press any key to exit...
  pause >nul
  exit
) else (
  echo Node.js found.
)

echo.
echo Checking dependencies...
if not exist node_modules (
  echo Installing dependencies...
  npm install
) else (
  echo Dependencies already installed.
)

echo.
echo Starting ProxyNameClaimer Web...
echo.
echo The application is starting. Please open in your browser: http://localhost:3000
echo (The browser should open automatically)
echo.
echo Press CTRL+C to stop the server.
echo.

start http://localhost:3000
npm start
