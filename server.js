const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./shared/jwt');
const errorHandler = require('./shared/error_handler');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);

// controllers
const userController = require('./features/user/user.controller');
const debtController = require('./features/debt/debt.controller');
const cardController = require('./features/card/card.controller');
const incomeController = require('./features/income/income.controller');
const creditController = require('./features/credit/credit.controller');

// api routes
app.use('/user', userController);
app.use('/debts', debtController);
app.use('/cards', cardController);
app.use('/incomes', incomeController);
app.use('/credits', creditController);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 1314;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});