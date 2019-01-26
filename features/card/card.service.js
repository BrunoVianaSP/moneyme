const db = require('../../shared/db');
const utils = require('../../shared/utils');
const summaryService = require('./../summary/summary.service');
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
    const user = await Debt.findOne({ _id: debtParam._id });

    Object.assign(user, debtParam);

    await user.save();
}

async function removeDebt(id) {
    await Debt.findByIdAndRemove(id);
}

async function getAllDebts() {
    var debts = await Debt.find().select('-hash');
    const summary = summaryService.debtSummary(debts);
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
    var debts =  await Debt.aggregate([
        { "$redact": { 
            "$cond": [ 
                { "$and": [ 
                    { "$eq": [ { "$year": "$date" }, year ] }, 
                    { "$eq": [ { "$month": "$date" }, month ] }
                ] }, 
                "$$KEEP", 
                "$$PRUNE" 
             ] } 
        }
    ]);
    
    const summary = summaryService.debtSummary(debts);

    return summary;
}



