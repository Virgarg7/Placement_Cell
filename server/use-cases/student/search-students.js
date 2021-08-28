module.exports = function makeSearchStudents({ db, Fuse }) {
    return async function searchStudents({ term }) {
        let response = await db.getAllStudents({
            fields: `firstName lastName email stream`,
        });
        if (response) {
            response = response.map((student) => {
                return {
                    _id: student.id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    email: student.email,
                    degree: student.stream.degree,
                    major: student.stream.major,
                    sem: student.stream.sem,
                };
            });
            if (term.trim().length > 0) {
                const fuse = new Fuse(response, {
                    threshold: 0.3,
                    keys: [
                        "firstName",
                        "lastName",
                        "email",
                        "degree",
                        "major",
                        "sem",
                    ],
                });

                // Search
                const result = fuse.search(term);

                response = result.map((val) => val.item);
                return response;
            }
        }
        return response;
    };
};
