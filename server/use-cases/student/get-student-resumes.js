module.exports = function makeGetStudentResumes({ db }) {
    return async function getStudentResumes({ id }) {
        const response = await db.getStudent({ 
            id ,
            fields: 'resumes'
        });
        return response;
    }
}