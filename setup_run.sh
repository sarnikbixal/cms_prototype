npm i 
npm install forever -g
forever stop 0
wait
NODE_ENV=development PORT=3001 forever start server.js
wait
cd react-app
npm i
wait
npm start
