module.exports = function makeUpdateStudent({ db }) {
    return async function updateStudent({ id, data }) {
        const response = await db.updateStudent({ id, data });
        return response;
    }
}