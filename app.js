const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express(); // Upon calling express, variable app will get a bunch of methods

// 1) MIDDLEWARES
console.log('Running', process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static('./public'));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 2) ROUTES

// Mounting the routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;