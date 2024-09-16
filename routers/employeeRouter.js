const express = require("express");
const router = express.Router();
const Employee = require('../models/employee');

// router.get('/', async (req, res) => {
//     try {
//         res.body({ "hello": "ddd" })
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             error: error.message
//         });
//     }
// });

router.post('/employee', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update an employee
router.put('/employee', async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate({ id: req.body.id }, req.body, { new: true });
        res.json(employee);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.delete('/employee', async (req, res) => {
    try {
        await Employee.deleteOne({ id: req.query.id });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;