module.exports = function makeDeleteStream({ db }) {
    return async function deleteStream({ id }) {
        // Check any user with given stream is there or not
        const students = await db.studentsOfStreamCount({ id });
        if (students == 0) {
            // Delete Stream
            const response = await db.deleteStream({ id });

            // Get all streams
            if (response) {
                const streams = await db.getAllStreams({});
                return streams;
            }
            return response;
        }
        return {
            error: `Stream can't be deleted as there are students in this stream`,
        };
    };
};
