@echo off
echo Installing Server Dependencies...
cd server
call npm install
start "Assured Contract Farming - Server" npm run dev

cd ..
echo Installing Client Dependencies...
cd client
call npm install
start "Assured Contract Farming - Client" npm run dev

echo Application starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause
