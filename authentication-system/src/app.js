const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const routes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
    app.use(morgan('combined'));
}

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/auth', routes);
app.use('/v1/users', userRoutes);


app.use((req, res, next) => {
    next(new ApiError(404, 'Not found'));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
