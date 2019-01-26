const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true, unique: true },
    limit: { type: Number, required: false },
    due: { type: Number, required: true },
    tax: { type: Number, required: false },
    created: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Card', schema);
 