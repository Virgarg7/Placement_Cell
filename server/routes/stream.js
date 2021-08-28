const express = require('express');
const router = express.Router();
const makeCallback = require('../express-callback');
const {stream} = require('../controllers');

// Routes
router.post('/', makeCallback(stream.addStream));
router.get('/all', makeCallback(stream.getAllStreams));
router.get('/search', makeCallback(stream.searchStreams));
router.get('/:id', makeCallback(stream.getStream));
router.put('/:id', makeCallback(stream.updateStream));
router.delete('/:id', makeCallback(stream.deleteStream));

module.exports = router;