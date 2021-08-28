module.exports = function makeSearchStreams({ db, Fuse }) {
    return async function searchStreams({ term }) {
        let response = await db.getAllStreams({});
        if (response) {
            const fuse = new Fuse(response, {
                threshold: 0.3,
                keys: ["degree", "major", "sem"],
            });

            if (term.trim().length > 0) {
                // Search
                const result = fuse.search(term);

                response = result.map((val) => val.item);
                return response;
            }
        }
        return response;
    };
};
