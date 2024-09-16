const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: { type: String, required: true },
    email_address: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, match: /^[89]\d{7}$/ },
    gender: { type: String, required: true, enum: ['Male', 'Female'] },
    cafe: { type: String, ref: 'Cafe' },
    start_date: { type: Date, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
