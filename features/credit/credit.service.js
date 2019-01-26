const db = require('../../shared/db');
const summaryService = require('./../summary/summary.service');
const Credit = db.Credit;
const Card = db.Card;

module.exports = {
    create,
    getAll,
    update,
    _delete
};

async function create(param) {
    const card = await Card.findOne({name: param.card});

    if(card) {
       const entity = new Credit(param);   
       entity.save();
       return entity;
    }
    
    throw new Error("Card " + param.card + " not found.");
}

async function update(param) {
    console.log({param});
    const found = await Credit.findById(param.id).select('-hash');
    Object.assign(found, param);
    await found.save();
}

async function _delete(id) {
    console.log({id});
    await Credit.findByIdAndRemove(id);
}

async function getAll() {
    var entities = await Credit.find().select('-hash');
    const summary = summaryService.creditSummary(entities);
    return summary;
}