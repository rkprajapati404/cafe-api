const express = require("express");
const router = express.Router();
const Cafe = require('../models/cafe');


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
router.put('/cafe', async (req, res) => {
    try {
        const cafe = await Cafe.findOneAndUpdate({ id: req.body.id }, req.body, { new: true });
        res.json(cafe);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a cafe and all its employees
router.delete('/cafe', async (req, res) => {
    try {
        await Employee.deleteMany({ cafe: req.query.id });
        await Cafe.deleteOne({ id: req.query.id });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;