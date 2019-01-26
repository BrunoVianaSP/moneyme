const db = require('../../shared/db');
const summaryService = require('./../summary/summary.service');
const Card = db.Card;

module.exports = {
    create,
    getAll,
    update,
    _delete
};

async function create(param) {
    const entity = new Card(param);
    entity.save();
}

async function update(param) {
    console.log({param});
    const found = await Card.findById(param.id).select('-hash');
    Object.assign(found, param);
    await found.save();
}

async function _delete(id) {
    console.log({id});
    await Card.findByIdAndRemove(id);
}

async function getAll() {
    var founds = await Card.find().select('-hash');
    const summary = summaryService.creditSummary(founds);
    return summary;
}





