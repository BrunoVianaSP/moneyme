const db = require('../../shared/db');
const summaryService = require('./../summary/summary.service');
const Income = db.Income;

module.exports = {
    create,
    getAll,
    update,
    _delete
};

async function create(param) {
    const entity = new Income(param);
    entity.save();
}

async function update(param) {
    console.log({param});
    const found = await Income.findById(param.id).select('-hash');
    Object.assign(found, param);
    await found.save();
}

async function _delete(id) {
    console.log({id});
    await Income.findByIdAndRemove(id);
}

async function getAll() {
    var entities = await Income.find().select('-hash');
    const summary = summaryService.incomeSummary(entities);
    return summary;
}