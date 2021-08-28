module.exports = function makeGetResume({ db }) {
    return async function getResume({ id }) {
        const response = await db.getResume({ id });
        return response;
    }
}