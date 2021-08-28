module.exports = function makeSearchSelectionProcessSelected({ db, Fuse }) {
    return async function searchSelectionProcessSelected({ id, processId, term }) {
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
                if (term.trim().length > 0) {
                    const fuse = new Fuse(response.selectionProcess[0].selected, {
                        threshold: 0.3,
                        keys: ["firstName", "lastName", "email"],
                    });
        
                    // Search
                    const searchResults = fuse.search(term);
        
                    response.selectionProcess[0].selected = searchResults.map((val) => val.item);
                    return response;
                }
                else{
                    return response;
                }
            }
        }
        return response;
    };
};
