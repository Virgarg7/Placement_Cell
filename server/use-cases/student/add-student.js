const { generatePassword, encryptPassword, prepareStudentSignupEmail } = require('../../entities');

module.exports = function makeAddStudent({ db, bcrypt, passwordGenerator, sendEmailQueue }) {
    return async function addStudent({ data }) {
        // Check Email id already exist or not
        const isExist = await alreadyExist({ email: data.email, db });
        if (isExist) {
            throw new Error("Email Id already exist...");
        }

        // Generate Password
        data.actualPassword = generatePassword({ passwordGenerator });

        // Encrypt Password
        data.password = await encryptPassword({ bcrypt, password: data.actualPassword });

        // Add student
        const response = await db.addStudent({ data });

        // Add mail data into mail queue
        const mailData = prepareStudentSignupEmail({ data });
        sendEmailQueue.add(mailData);

        return response;
    }
}

// This function is responsible for checking that email id is already present or not
const alreadyExist = async ({ email, db }) => {
    // Query the the database and check any student with given email is there or not
    const noOfStudents = await db.checkStudentExist({ email });
    if (noOfStudents > 0) {
        return true;
    }
    return false;
}