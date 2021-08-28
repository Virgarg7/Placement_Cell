module.exports = function makeGetOpportunity({ db }) {
    return async function getOpportunity({ id }) {
        const response = await db.getOpportunity({ id });
        return response;
    }
}