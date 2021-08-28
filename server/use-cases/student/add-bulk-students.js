const { generatePassword, encryptPassword, prepareStudentSignupEmail } = require('../../entities');

module.exports = function makeAddBulkStudents({ db, bcrypt, passwordGenerator, sendEmailQueue, csv, fs }) {
    return async function addBulkStudents({ data }) {
        // // Get content of csv file
        // const csvFilePath = __basedir + '/uploads/' + filename;
        // const data = await csv().fromFile(csvFilePath)

        // // Delete the file
        // fs.unlinkSync(csvFilePath);

        console.log(data);
        const exist = [];
        // Remove element from data if it is already exist and add random generated password
        for (let i = data.length - 1; i >= 0; --i) {
            // Check given email id is already exist or not
            const isExist = await alreadyExist({ email: data[i].email, db });
            if (isExist) {
                exist.push(data[i].email);
                data.splice(i, 1);
                continue;
            }

            // Generate random password and encrypt it
            data[i].actualPassword = generatePassword({ passwordGenerator });
            data[i].password = await encryptPassword({ bcrypt, password: data[i].actualPassword });
        }

        // Add students in bulk
        const result = await db.addBulkStudents({ data });

        // Add students into mail queue  
        for (let d of data) {
            const mailData = prepareStudentSignupEmail({ data: d });
            sendEmailQueue.add(mailData);
        }

        // Make response
        const response = {
            added: result,
            alreadyExist: exist
        }
        console.log(response);
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