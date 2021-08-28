module.exports = function makeGetStream({ db }) {
    return async function getStream({ id }) {
        const response = await db.getStream({ id });
        return response;
    }
}