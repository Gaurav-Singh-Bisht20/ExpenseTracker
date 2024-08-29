const express = require('express');
const router = express.Router();

const {createTracker} = require('../controllers/Tracker');


router.post('/createTracker',createTracker);

module.exports = router;