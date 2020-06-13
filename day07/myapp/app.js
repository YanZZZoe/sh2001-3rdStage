var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//后台管理系统路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var activityRouter = require('./routes/activity');
var bannerRouter = require('./routes/banner');
var messagesRouter = require('./routes/messages');
var cartRouter = require('./routes/cart');
var ordersRouter = require('./routes/orders');
var productsRouter = require('./routes/products');

//前端接口文档
var bannerApi = require('./api/banner');
var cartApi = require('./api/cart');
var commentApi = require('./api/comment');
var navApi = require('./api/nav');
var orderApi = require('./api/order');
var proApi = require('./api/pro');
var searchApi = require('./api/search');
var usersApi = require('./api/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//访问后端路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);
app.use('/banner', bannerRouter);
app.use('/activity', activityRouter);
app.use('/messages', messagesRouter);

//访问前端接口
app.use('/api/banner', bannerApi);
app.use('/api/cart', cartApi);
app.use('/api/comment', commentApi);
app.use('/api/search', searchApi);
app.use('/api/nav', navApi);
app.use('/api/pro', proApi);
app.use('/api/users', usersApi);
app.use('/api/order', orderApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
