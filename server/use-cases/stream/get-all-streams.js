module.exports = function makeGetAllStreams({ db }) {
    return async function getAllStreams() {
        const response = await db.getAllStreams({});
        return response;
    }
}