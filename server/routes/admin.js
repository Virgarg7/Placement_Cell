const express = require('express');
const router = express.Router();

const makeCallback = require('../express-callback');
const { admin } = require('../controllers');


// Routes
router.get('/dashboard', makeCallback(admin.adminDashboard));
router.post('/verify', makeCallback(admin.verifyAdmin));
router.post('/login',makeCallback(admin.adminLogin));
router.post('/', makeCallback(admin.addAdmin));


module.exports = router;