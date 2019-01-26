const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: false },
    from: { type: String, required: false },
    created: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Income', schema);
 