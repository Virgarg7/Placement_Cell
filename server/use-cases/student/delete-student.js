module.exports = function makeDeleteStudent({ db }) {
    return async function deleteStudent({ id }) {
        // Delete Student
        const response = await db.deleteStudent({ id });
        if(response){
            const students = await db.getAllStudents({
                fields: 'firstName lastName email degree major sem'
            });

            if (students) {
                return students.map((student) => {
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
            
            return students;
        }
        return response;
    }
}