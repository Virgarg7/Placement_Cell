module.exports = function makeUpdateOpportunity({ db }) {
    return async function updateOpportunity({ id, data }) {
        const response = await db.updateOpportunity({ id, data });
        return response;
    }
}