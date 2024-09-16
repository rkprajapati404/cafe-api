var express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
// Ensure to load the environment variables from .env file
var app = express();
app.use(cors());
app.use(express.json({
    extended: true
}));


app.get("/health", (req, res) => {
    res.send("Cafe Application Running");
});

// Database connection
mongoose.connect(process.env.DATABASE_URL,);
const db = mongoose.connection;
db.on('error', (error) => console.log(error.red));
db.once('open', () => console.log("Connected to Database".green.underline.bold));

app.use('/api/v1/employee', require('./routers/employeeRouter'));
app.use('/api/v1/cafe', require('./routers/cafeRouter'));


let server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});