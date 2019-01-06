const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    date: { type: Date, required: true, unique: false },
    day: { type: String, required: false },
    item: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: false },
    value: { type: Number, required: true },
    status: { type: String, required: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Debt', schema);
