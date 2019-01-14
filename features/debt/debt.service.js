const db = require('../../shared/db');
const utils = require('../../shared/utils');
const Debt = db.Debt;

module.exports = {
    newDebt,
    updateDebt,
    removeDebt,
    getAllDebts,
    getAllDebtsMonthly,
    getAllDebtsDaily,
    getAllDebtsByMonth
};



async function getById(id) {
    return await Debt.findById(id).select('-hash');
}

async function newDebt(debtParam) {
    if(debtParam instanceof Array) {
        saveDebts(debtParam);
    } else {
        await saveDebt(debtParam)
    }
}

function saveDebts(debts) {
    debts.forEach(function (res) {
        saveDebt(res)
    });
}

function saveDebt(debtParam) {
    const debt = new Debt(debtParam);
    debt.day = utils.getDayName(debt.date);
    debt.save();
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
    var total = 0;
    var paid = 0;
    var unpaid = 0;

    debts.forEach(function(debt){
        if(debt.status === "P") {
           paid += debt.price; 
        } else if(debt.status === "NP") {
            unpaid += debt.price;
        }
        total += debt.price;
    });

    const summary = {
        debts : debts,
        total : total,
        paid : paid,
        unpaid : unpaid,
        items: debts.length
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

async function getAllDebtsByMonth(month, year) {
    // var debts = await Debt.aggregate([{$project: {name: 1, month: {$month: '$bday'}}},
    //                                   {  $match: {month: month}}]);
    var debts = await Debt.aggregate([{ $project: {year: "$date",
                                                   month: "$date"},
                                        $match:   {year: year,
                                                   month: month}  
                                      } ]);

    var total = 0;
    var paid = 0;
    var unpaid = 0;

    debts.forEach(function(debt){
        if(debt.status === "P") {
           paid += debt.price; 
        } else if(debt.status === "NP") {
            unpaid += debt.price;
        }
        total += debt.price;
    });

    const summary = {
        debts : debts,
        total : total,
        paid : paid,
        unpaid : unpaid,
        items: debts.length
    }

    return summary;
}

