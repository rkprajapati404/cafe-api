const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const cafeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String },
    location: { type: String, required: true },
    _id: { type: String, default: uuidv4 },
});

module.exports = mongoose.model('Cafe', cafeSchema);
