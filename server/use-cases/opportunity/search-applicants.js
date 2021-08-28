module.exports = function makeSearchApplicants({ db, Fuse }) {
    return async function searchApplicants({ id, term }) {
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

        if (term.trim().length > 0) {
            const fuse = new Fuse(response.applicants, {
                threshold: 0.3,
                keys: ["studentId.firstName", "studentId.lastName", "studentId.email"],
            });

            // Search
            const result = fuse.search(term);

            response.applicants = result.map((val) => val.item);
            return response;
        }

        return response;
    }
}