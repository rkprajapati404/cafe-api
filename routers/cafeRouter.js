const express = require("express");
const router = express.Router();
const Cafe = require('../models/cafe');


router.get('/', async (req, res) => {
    try {
        const location = req.query.location;
        let query = {};
        if (location) {
            query.location = location;
        }
        const cafes = await Cafe.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'employees',
                    localField: '_id',
                    foreignField: 'cafe',
                    as: 'employees'
                }
            },
            {
                $addFields: {
                    employees_count: { $size: '$employees' }
                }
            },
            { $sort: { employees_count: -1 } }
        ]);
        res.json(cafes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const cafe = new Cafe(req.body);
        await cafe.save();
        res.status(201).json(cafe);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a cafe
router.put('/', async (req, res) => {
    try {
        const cafe = await Cafe.findOneAndUpdate({ id: req.body.id }, req.body, { new: true });
        res.json(cafe);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a cafe and all its employees
router.delete('/', async (req, res) => {
    try {
        await Cafe.deleteOne({ id: req.query.id });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;