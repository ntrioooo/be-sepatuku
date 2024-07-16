const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const itemsRouter = require('./app/api/v1/items/router');
const merksRouter = require('./app/api/v1/merks/router');
const authRouter = require('./app/api/v1/auth/router');
const orderRouter = require('./app/api/v1/orders/router');
const cartRouter = require('./app/api/v1/carts/router');
const reviewRouter = require('./app/api/v1/reviews/router');

const v1 = '/api/v1/';

const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${v1}`, itemsRouter);
app.use(`${v1}`, merksRouter);
app.use(`${v1}`, authRouter);
app.use(`${v1}`, orderRouter);
app.use(`${v1}`, cartRouter);
app.use(`${v1}`, reviewRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
