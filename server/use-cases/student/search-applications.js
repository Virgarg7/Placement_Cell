module.exports = function makeSearchStudentApplications({ db, Fuse }) {
    return async function searchStudentApplications({ id, term }) {
        let response = await db.getStudentsApplications({ 
            id
        });

        for(let i=0;i<response.length; ++i){
            response[i].applicants = response[i].applicants.find((applicant)=>applicant.studentId == id);
        }

        if (term.trim().length > 0) {
            const fuse = new Fuse(response, {
                threshold: 0.3,
                keys: [
                    "companyName",
                    "roleName",
                    "CTC",
                    "applicants[0].appliedAt",
                ],
            });

            // Search
            const result = fuse.search(term);

            response = result.map((val) => val.item);
            return response;
        }

        return response;
    }
}