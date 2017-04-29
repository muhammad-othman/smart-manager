var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
app.locals.dir = path.join(__dirname, '/views');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.set('view engine', 'ejs');
app.set('mainDir',__dirname);
app.engine('html', require('ejs').renderFile);
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/emps'));
app.use(require('./routes/categories'));
app.use(require('./routes/products'));
app.use(require('./routes/bills'));
var port = process.env.port || 3000;
app.listen(port, function() {
    console.log("starteddddddddd : "+ port);
})
