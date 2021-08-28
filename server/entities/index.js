const generatePassword=require('./generate-password');
const encryptPassword=require('./encrypt-password');
const prepareStudentSignupEmail=require('./prepare-student-signup-email')
const prepareForgotPasswordEmail = require('./prepare-forgot-password-email');
const prepareNewOpportunityEmail = require('./prepare-new-opportunity-email');
const prepareSelectedStudentsEmail = require('./prepare-selected-students');
const preparePlacedStudentsEmail = require('./prepare-placed-students');

module.exports=Object.freeze({
    generatePassword,
    encryptPassword,
    prepareStudentSignupEmail,
    prepareForgotPasswordEmail,
    prepareNewOpportunityEmail,
    prepareSelectedStudentsEmail,
    preparePlacedStudentsEmail
})