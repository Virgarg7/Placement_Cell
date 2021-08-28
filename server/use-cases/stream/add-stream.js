module.exports = function makeAddStream({ db }) {
    return async function addStream({ data }) {
        // Add Stream
        const response = await db.addStream({data});
        return response;
    }
}