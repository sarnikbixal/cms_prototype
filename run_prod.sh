forever stop 0
wait
cd react-app
npm run build
wait
cd..
NODE_ENV=development PORT=3001 forever start server.js
wait
