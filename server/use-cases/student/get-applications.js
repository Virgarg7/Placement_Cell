module.exports = function makeGetStudentApplications({ db }) {
    return async function getStudentApplications({ id }) {
        let response = await db.getStudentsApplications({ 
            id
        });


        for(let i=0;i<response.length; ++i){
            response[i].applicants = response[i].applicants.find((applicant)=>applicant.studentId == id);
        }

        return response;
    }
}