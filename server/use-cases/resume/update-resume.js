module.exports = function makeUpdateResume({ db }) {
    return async function updateResume({ id, data }) {
        const response = await db.updateResume({ id, data });
        return response;
    }
}