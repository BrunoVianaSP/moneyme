const db = require('../../shared/db');
const utils = require('../../shared/utils');
const Debt = db.Debt;

module.exports = {
    newDebt,
    updateDebt,
    removeDebt,
    getAllDebts,
    getAllDebtsMonthly,
    getAllDebtsDaily
};

async function getById(id) {
    return await Debt.findById(id).select('-hash');
}

async function newDebt(debtParam) {
    
    
    if(debtParam instanceof Array) {
        console.log({debtParam});
        debtParam.forEach( function(res) {
            console.log({res});
            const debt = new Debt(res);
            debt.day = utils.getDayName(debt.date);
            debt.save();           
        });
        return;
    } else {
        debt.day = utils.getDayName(debt.date);
    }
    await debt.save();
}

async function updateDebt(debtParam) {
    // console.log({userParam});

    const user = await Debt.findOne({ _id: debtParam._id });

    Object.assign(user, debtParam);

    await user.save();
}

async function removeDebt(id) {
    await Debt.findByIdAndRemove(id);
}

async function getAllDebts() {
    var debts = await Debt.find().select('-hash');
    var sum = 0;

    debts.forEach(function(debt){
        sum += debt.value;
    });

    const summary = {
        debts : debts,
        sum : sum
    }

    return summary;
}

async function getAllDebtsMonthly() {
    var debts = await Debt.find().select('-hash');

    var summary = Object.values(debts.reduce((result, {
        date,
        value
    }) => {
        var month = utils.getMonthName(date);

        if (!result[month]) result[month] = {
            month: month,
            total: 0
        };
        // Append to group
        result[month].total += value;

        return result;
    }, {}));

  return summary;
}

async function getAllDebtsDaily() {
    var debts = await Debt.find().select('-hash');

    var summary = Object.values(debts.reduce((result, {
        date,
        weekday,
        value
    }) => {
        // Create new group
        if (!result[date]) result[date] = {
            date,
            weekday: utils.getDayName(date),
            total: 0
        };
        // Append to group
        result[date].total += value;

        return result;
    }, {}));

  return summary;
}


 

