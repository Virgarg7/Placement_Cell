const bcrypt = require("bcrypt");
const passwordGenerator = require("generate-password");
const csv = require("csvtojson");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Fuse = require("fuse.js");

const makeAddStudent = require("./add-student");
const makeAddBulkStudents = require("./add-bulk-students");
const makeGetStudent = require("./get-student");
const makeGetAllStudents = require("./get-all-students");
const makeGetStudentResumes = require("./get-student-resumes");
const makeDeleteStudent = require("./delete-student");
const makeUpdateStudent = require("./update-student");
const makeStudentLogin = require("./student-login");
const makeSearchStudents = require("./search-students");
const makeEligibleOpportunities = require("./eligible-opportunities");
const makeSearchEligibleOpportunities = require('./search-eligible-opportunities');
const makeForgotPassword = require("./forgot-password");
const makeChangePassword = require('./change-password');
const makeGetStudentProfile = require('./get-student-profile');
const makeGetStudentApplications = require('./get-applications');
const makeSearchStudentApplications = require('./search-applications');
const { db, sendEmailQueue } = require("../../data-access");
const general = require("../general");

//
const addStudent = makeAddStudent({
    db,
    bcrypt,
    passwordGenerator,
    sendEmail: general.sendEmail,
    sendEmailQueue,
});

const addBulkStudents = makeAddBulkStudents({
    db,
    bcrypt,
    passwordGenerator,
    sendEmail: general.sendEmail,
    sendEmailQueue,
    csv,
    fs,
});

const getStudent = makeGetStudent({ db });

const getAllStudents = makeGetAllStudents({ db });

const getStudentResumes = makeGetStudentResumes({ db });

const deleteStudent = makeDeleteStudent({ db });

const updateStudent = makeUpdateStudent({ db });

const studentLogin = makeStudentLogin({ db, bcrypt });

const searchStudents = makeSearchStudents({ db, Fuse });

const eligibleOpportunities = makeEligibleOpportunities({ db });

const searchEligibleOpportunities = makeSearchEligibleOpportunities({db, Fuse});

const forgotPassword = makeForgotPassword({
    db,
    bcrypt,
    passwordGenerator,
    sendEmail: general.sendEmail,
    sendEmailQueue,
});

const changePassword = makeChangePassword({
    db,
    bcrypt
})

const getStudentProfile = makeGetStudentProfile({db});
const getStudentApplications = makeGetStudentApplications({db});
const searchStudentApplications = makeSearchStudentApplications({db, Fuse});

// Export use cases
module.exports = Object.freeze({
    addStudent,
    addBulkStudents,
    getStudent,
    getAllStudents,
    getStudentResumes,
    deleteStudent,
    updateStudent,
    studentLogin,
    searchStudents,
    eligibleOpportunities,
    forgotPassword,
    changePassword,
    getStudentProfile,
    getStudentApplications,
    searchEligibleOpportunities,
    searchStudentApplications
});
