const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const employeeRouter = require("./routes/employeeRouter");
const app = express();
const mongoose = require("mongoose");
//connect mongoose to mongodb database
mongoose.connect("mongodb://127.0.0.1:27017/company").then(()=>console.log(" Database is connected")).catch((err)=>console.log(err));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/employee",employeeRouter);
//All Employees List route
app.get("/employees-list",(req,res)=>{
    // res.render("./employees-list");
    res.sendFile(path.join(__dirname,"./views/employees-list.html"))
})
//More_Info page route
app.get("/more-info", (req,res)=>{
  res.sendFile(path.join(__dirname,"/views/more-info.html"))
  
})
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
