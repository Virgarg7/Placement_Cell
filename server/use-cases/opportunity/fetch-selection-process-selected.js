module.exports = function makeFetchSelectionProcessSelected({ db }) {
    return async function fetchSelectionProcessSelected({ id, processId }) {
        // Fetch Selected in selection process
        let response = await db.fetchSelectionProcessSelected({
            id,
            processId,
        });
        if (response) {
             response.selectionProcess = response.selectionProcess.find(
                (process) => process._id == processId
            );

            if (response) {
                return response;
            }
        }
        return response;
    };
};
