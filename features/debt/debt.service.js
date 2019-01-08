const db = require('../../shared/db');
const utils = require('../../shared/utils');
const Debt = db.Debt;

module.exports = {
    newDebt,
    updateDebt,
    removeDebt,
    getAllDebts,
    getAllDebtsMonthly
};

async function getById(id) {
    return await Debt.findById(id).select('-hash');
}

async function newDebt(debtParam) {
    const debt = new Debt(debtParam);
    debt.day = utils.getDayName(debt.date);
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

// async function getAllDebtsMonthly() {
//       var summary = Debt.group(
//         {
//           key: { item: 1, value: 1 },
//           cond: { value: { $gt: 0 } },
//           reduce: function( curr, result ) {
//                       result.total += curr.item.qty;
//                   },
//           initial: { total : 0 }
//         }
//      )
//     return summary;
// }

async function getAllDebtsMonthly() {
    var gr = {
        key: { value: 1 },
        cond: { value: { $gt: 0 } },
        reduce: function( curr, result ) {
                    result.total += curr.value;
        },
        initial: { total : 0 }
      };

   var summary = Debt.aggregate([
    { $match: {} }, 
    { $group: gr }]
   );

  return summary;
}


 

