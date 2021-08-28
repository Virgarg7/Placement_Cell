module.exports = function makeGetAllStudents({ db }) {
    return async function getAllStudents() {
        const response = await db.getAllStudents({
            fields: `firstName lastName email stream`,
        });
        if (response) {
            return response.map((student) => {
                return {
                    _id: student.id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    email: student.email,
                    degree: student.stream.degree,
                    major: student.stream.major,
                    sem: student.stream.sem

                };
            });
        }
        return response;
    };
};
