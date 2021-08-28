const useCases=require('../../use-cases');
const makeAddStream=require('./add-stream');
const makeDeleteStream=require('./delete-stream');
const makeGetStream=require('./get-stream');
const makeGetAllStreams=require('./get-all-streams');
const makeUpdateStream=require('./update-stream');
const makeSearchStreams = require('./search-streams');

const addStream=makeAddStream({
    addStreamToApp: useCases.addStream
});

const deleteStream=makeDeleteStream({
    deleteStreamToApp: useCases.deleteStream
});

const getStream=makeGetStream({
    getStreamToApp: useCases.getStream
});

const getAllStreams=makeGetAllStreams({
    getAllStreamsToApp: useCases.getAllStreams
})

const updateStream=makeUpdateStream({
    updateStreamToApp: useCases.updateStream
})

const searchStreams = makeSearchStreams({
    searchStreamsToApp: useCases.searchStreams
})

module.exports=Object.freeze({
    addStream,
    deleteStream,
    getStream,
    getAllStreams,
    updateStream,
    searchStreams
});