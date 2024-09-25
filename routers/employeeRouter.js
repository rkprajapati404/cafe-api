const express = require("express");
const router = express.Router();
const Employee = require('../models/employee');


router.get('/', async (req, res) => {
    try {
        const cafeId = req.query.cafe;
        let query = {};
        if (cafeId) {
            query.cafe = cafeId;
        }
        const employees = await Employee.find(query).populate('cafe');
        const now = new Date();
        employees.forEach(emp => {
            emp.days_worked = Math.floor((now - new Date(emp.start_date)) / (1000 * 60 * 60 * 24));
        });
        employees.sort((a, b) => b.days_worked - a.days_worked);
        res.json(employees);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId).populate('cafe');

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const now = new Date();
        employee.days_worked = Math.floor((now - new Date(employee.start_date)) / (1000 * 60 * 60 * 24));

        res.json(employee);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update an employee
router.put('/', async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
        res.json(employee);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.delete('/', async (req, res) => {
    try {
        await Employee.deleteOne({ _id: req.query._id });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;