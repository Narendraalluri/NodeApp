var express = require('express'),
  app = express();

var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer')


// configure Express

app.use(multer({
  dest: './uploads/'
}))

var html_dir = __dirname + '/public';
app.use(express.static(html_dir));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.cookieParser());
app.use(express.session({
  secret: '1234567890QWERTY'
}));


// Mongo DB connection
var mongoose = require('mongoose');
var dbConnection;


if (process.argv[2] == 'local')
  dbConnection = mongoose.connect('mongodb://localhost/TimeSheetDB');
else
  dbConnection = mongoose.connect('mongodb://root:FbVQsj0Zx2LW@localhost/admin');

// User API
var userApi = require('./routes/userRoutes')(app, {
  'mongoose': mongoose,
  'db': dbConnection
});


// TimeSheet API
var timeSheetApi = require('./routes/timeSheetRoutes')(app, {
  'mongoose': mongoose,
  'db': dbConnection
});

// FIleContent API
var fileContentApi = require('./routes/fileContentRoutes')(app, {
  'mongoose': mongoose,
  'db': dbConnection
});

// Common API
var commonApi = require('./routes/commonRoutes')(app, {
  'mongoose': mongoose,
  'db': dbConnection
});


// Binding port
var server = app.listen(8000, function() {
  console.log('listening on port %d', server.address().port);
});
