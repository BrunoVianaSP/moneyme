const config = require('../config.json');
const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
module.exports = {
    User: require('../features/user/user.model'),
    Debt: require('../features/debt/debt.model'),
    Card: require('../features/card/card.model'),
    Income: require('../features/income/income.model'),
    Credit: require('../features/credit/credit.model')
};