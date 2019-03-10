const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    date: { type: Date, required: true, unique: false },
    day: { type: String, required: false },
    name: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: false },
    price: { type: Number, required: true },
    status: { type: String, required: false },
    created: { type: Date, default: Date.now },
    owner: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Debt', schema);
