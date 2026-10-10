@echo off
cd /d "%~dp0"
echo ecommercewale.in local preview
echo Open http://localhost:3000 in your browser after the server starts.
echo Press Ctrl+C to stop.
if exist "%~dp0..\.tools\node-v24.21.0-win-x64\node.exe" (
  "%~dp0..\.tools\node-v24.21.0-win-x64\node.exe" server.mjs
) else (
  node server.mjs
)
pause
