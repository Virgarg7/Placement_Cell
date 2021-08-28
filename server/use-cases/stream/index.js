const Fuse = require('fuse.js');

const makeAddStream = require('./add-stream');
const makeDeleteStream = require('./delete-stream');
const makeGetStream = require('./get-stream');
const makeGetAllStreams = require('./get-all-streams');
const makeUpdateStream = require('./update-stream');
const makeSearchStreams = require('./search-streams');
const { db } = require('../../data-access');

const addStream=makeAddStream({db});
const getStream=makeGetStream({db});
const getAllStreams=makeGetAllStreams({db});
const deleteStream=makeDeleteStream({db});
const updateStream=makeUpdateStream({db});
const searchStreams = makeSearchStreams({db, Fuse});

module.exports=Object.freeze({
    addStream,
    getStream,
    getAllStreams,
    updateStream,
    deleteStream,
    searchStreams
})