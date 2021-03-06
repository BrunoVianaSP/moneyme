const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    date: { type: Date, required: true, unique: false },
    card: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: false },
    amount: { type: Number, required: true },
    status: { type: String, required: false },
    created: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Credit', schema);
