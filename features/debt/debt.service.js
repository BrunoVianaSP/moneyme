const db = require('../../shared/db');
const utils = require('../../shared/utils');
const summaryService = require('./../summary/summary.service');
const Debt = db.Debt;

module.exports = {
    create,
    update,
    _delete,
    all,
    day,
    daily,
    month,
    monthly,
    year
};

async function getById(id) {
    return await Debt.findById(id).select('-hash');
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

async function create(debtParam) {
    if(debtParam instanceof Array) {
        saveDebts(debtParam);
    } else {
        await saveDebt(debtParam)
    }
}

async function update(debtParam) {
    const user = await Debt.findOne({ _id: debtParam._id });

    Object.assign(user, debtParam);

    await user.save();
}

async function _delete(id) {
    await Debt.findByIdAndRemove(id);
}

async function all() {
    var debts = await Debt.find().select('-hash');
    const summary = summaryService.debtSummary(debts);
    return summary;
}



async function day(year, month, day) {
    console.log({year, month, day});

    var debts =  await Debt.aggregate([
        { "$redact": { 
            "$cond": [ 
                { "$and": [ 
                    { "$eq": [ { "$year": "$date" }, year ] },
                    { "$eq": [ { "$month": "$date" }, month ] },
                    { "$eq": [ { "$dayOfMonth": "$date" }, day ] }
                ] }, 
                "$$KEEP", 
                "$$PRUNE" 
             ] }
              
        },
        {$sort: {"date": -1} } 
    ]);

    const summary = summaryService.debtSummary(debts);
    
    var monthName = utils.getMonthName(month);

    const dayName = year + " " + monthName +  " " + day +  " - " + utils.getDayName(day);

    const body = {
        day: dayName,
        debts: summary.debts, 
    };

    const customSummary = {
        status : summary.status,
        body : body,
        total : summary.total,
        paid : summary.paid,
        unpaid : summary.unpaid,
        items : summary.items
    };

    return customSummary;
}

async function daily(year, month) {
    console.log(daily);
    console.log({year, month});

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
              
        },
        {$sort: {"date": -1} } 
    ]);

    const summary = summaryService.debtSummary(debts);

    var body = {};

    summary.debts.forEach(function(debt) {
          const dateName = utils.getDateDigitalName(debt.date);
          
          if (!body[dateName]){
            body[dateName] = [];
          } 

          body[dateName].push(debt);

    });

    const customSummary = {
        status : summary.status,
        body : body,
        total : summary.total,
        paid : summary.paid,
        unpaid : summary.unpaid,
        items : summary.items
    };

    return customSummary;
}

async function month(year, month) {
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

    var body = {};

    summary.debts.forEach(function(debt) {
        if(debt.date.getMonth() === month) {
        
            const monthName = debt.date.getFullYear() + " " + utils.getMonthName(debt.date.getMonth());
          
          if (!body[monthName]){
            body[monthName] = [];
          } 

          body[monthName].push(debt);
        }
    });

    for (var property in body) {
        if (body.hasOwnProperty(property)) {
            console.log({property});
            body[property] = summaryService.debtSummary(body[property]);
        }
    }

    const customSummary = {
        status : summary.status,
        body : body,
        total : summary.total,
        paid : summary.paid,
        unpaid : summary.unpaid,
        items : summary.items
    };

    return customSummary;
}

async function monthly(year) {
    var debts =  await Debt.aggregate([
        { "$redact": { 
            "$cond": [ 
                { "$and": [ 
                    { "$eq": [ { "$year": "$date" }, year ] }
                ] }, 
                "$$KEEP", 
                "$$PRUNE" 
             ] } 
        }
    ]);
    
    const summary = summaryService.debtSummary(debts);

    var body = {};

    summary.debts.forEach(function(debt) {
          const monthName = debt.date.getFullYear() + " " + utils.getMonthName(debt.date.getMonth());
          
          if (!body[monthName]){
            body[monthName] = [];
          } 

          body[monthName].push(debt);

    });

    for (var property in body) {
        if (body.hasOwnProperty(property)) {
            console.log({property});
            body[property] = summaryService.debtSummary(body[property]);
        }
    }

    const customSummary = {
        status : summary.status,
        body : body,
        total : summary.total,
        paid : summary.paid,
        unpaid : summary.unpaid,
        items : summary.items
    };

    return customSummary;
}

async function year(year) {
    var debts =  await Debt.aggregate([
        { "$redact": { 
            "$cond": [ 
                { "$and": [ 
                    { "$eq": [ { "$year": "$date" }, year ] }
                ] }, 
                "$$KEEP", 
                "$$PRUNE" 
             ] } 
        }
    ]);
    
    const summary = summaryService.debtSummary(debts);

    return summary;
}



