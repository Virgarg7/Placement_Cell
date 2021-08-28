module.exports = function makeUpdateStream({ db }) {
    return async function updateStream({ id, data }) {
        const response = await db.updateStream({ id, data });
        return response;
    }
}