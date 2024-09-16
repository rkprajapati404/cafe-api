var express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Ensure to load the environment variables from .env file

var app = express();
app.use(cors());

app.use(express.json({
    extended: true
}));

let server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});