// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = require('./router');

// DB Setup
mongoose.connect('mongodb://localhost:27017/auth', {
  useMongoClient: true
});

// App Setup
app.use(morgan('dev'));
app.use(cors());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('../client/build'));
  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
