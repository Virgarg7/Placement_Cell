module.exports = function makeGetStudentProfile({ db }) {
    return async function getStudentProfile({ id }) {
        const response = await db.getStudentProfile({ 
            id
        });
        return response;
    }
}