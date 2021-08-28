module.exports = function makeGetSelectionProcesses({ db }) {
    return async function getSelectionProcesses({ id }) {
        // Get Selection Processses
        const response = await db.getSelectionProcesses({id});
        return response;
    }
}