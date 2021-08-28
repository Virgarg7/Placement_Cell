const { generatePassword, encryptPassword, prepareForgotPasswordEmail } = require('../../entities');

module.exports = function makeForgotPassword({ db, bcrypt, passwordGenerator, sendEmailQueue }) {
    return async function forgotPassword({ data }) {
        const student=await db.checkStudentByEmail({ email: data.email });
        if(student.length==0){  
            throw new Error("Email Id Does Not Exist...");
        }

        // Generate Password
        data.actualPassword = generatePassword({ passwordGenerator });

        // Encrypt Password
        data.password = await encryptPassword({ bcrypt, password: data.actualPassword });

        // Update Password
        const response = await db.updateStudent({id: student[0]._id, data: {password: data.password}});

        // Add mail data into mail queue
        const mailData = prepareForgotPasswordEmail({ data });
        sendEmailQueue.add(mailData);

        return response;
    }
}
