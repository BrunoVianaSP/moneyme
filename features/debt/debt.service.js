const db = require('../../shared/db');
const Debt = db.Debt;

module.exports = {
    newDebt,
    updateDebt,
    removeDebt,
    getAllDebts
};

function getDayName(date) {
    switch (date.getDay()) {
        case 0:
            return "sunday";
        case 1:
            return "monday";
        case 2:
            return "tuesday";
        case 3:
            return "wednesday";
        case 4:
            return "thursday";
        case 5:
            return "friday";
        case 6:
            return "saturday";
        default:
            return "unknow"
    }
}
async function getById(id) {
    return await Debt.findById(id).select('-hash');
}

async function newDebt(debtParam) {
    
    // if (getById(debtParam.id)) {
    //     throw 'Debt already exists.';
    // }

    const debt = new Debt(debtParam);
    debt.day = getDayName(debt.date);
    await debt.save();
}

function isMatchOfPassword(user) {
    return user.password === user.confirmPassword;
}

async function updateDebt(userParam) {
    // console.log({userParam});

    const user = await Debt.findOne({ email: userParam.email });

    // validate
    if (!user) throw 'Debt not found';
    
    if(!isMatchOfPassword(userParam)) {
        throw 'Typed passwords do not match';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function removeDebt(id) {
    await Debt.findByIdAndRemove(id);
}

async function getAllDebts() {
    return await Debt.find().select('-hash');
}
 

