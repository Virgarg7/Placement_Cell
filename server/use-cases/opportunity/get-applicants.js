module.exports = function makeGetApplicants({ db }) {
    return async function getApplicants({ id }) {
        // Get Applicants
        let response = await db.getApplicants({id});
        if(response){
            response = JSON.stringify(response);
            response = JSON.parse(response);
            response.applicants = response.applicants.map((applicant)=>{
                delete applicant._id;
                return applicant
            })
        }
        return response;
    }
}