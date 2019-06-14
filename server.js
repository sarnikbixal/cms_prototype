const express = require('express'),
      http = require('http'),
      path = require('path'),
      bodyParser = require('body-parser'),
      timeout = require('connect-timeout'),
      cors = require('cors'),
      routes = require('./routes');

process.env.UV_THREADPOOL_SIZE = 128;

let app = express();
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(timeout(120000));
app.use(haltOnTimedout);
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', `*`);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static(path.join(__dirname,'/react-app/build')));
routes.configure(app);
app.get('*', function(req, res) {
  res.sendfile(path.join(__dirname,'/react-app/build/index.html'));
});


function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

let httpServer = http.createServer(app);
let httpPort = process.env.PORT || 3001;

httpServer.listen(httpPort, (err) =>{
    console.log('cms prototype server start')
});