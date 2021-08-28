const jwt = require('jsonwebtoken');

const useCases=require('../../use-cases');
const makeAddStudent=require('./add-student');
const makeGetStudent=require('./get-student');
const makeGetAllStudents= require('./get-all-students');
const makeGetStudentResumes = require('./get-student-resumes');
const makeAddBulkStudents=require('./add-bulk-students');
const makeDeleteStudent = require('./delete-student');
const makeUpdateStudent= require('./update-student');
const makeStudentLogin=require('./student-login');
const makeVerifyStudent = require('./verify-student');
const makeSearchStudents = require('./search-students');
const makeEligibleOpportunities = require('./eligible-opportunities');
const makeSearchEligibleOpportunities = require('./search-eligible-opportunities');
const makeForgotPassword = require('./forgot-password');
const makeChangePassword = require('./change-password');
const makeGetStudentProfile = require('./get-student-profile');
const makeGetStudentApplications = require('./get-student-applications');
const makeSearchStudentApplications = require('./search-student-applications');

const addStudent=makeAddStudent({
    addStudentToApp: useCases.addStudent
});

const addBulkStudents=makeAddBulkStudents({
    addBulkStudentsToApp: useCases.addBulkStudents
})

const getStudent=makeGetStudent({
    getStudentToApp: useCases.getStudent
});

const getAllStudents=makeGetAllStudents({
    getAllStudentsToApp: useCases.getAllStudents
})

const getStudentResumes=makeGetStudentResumes({
    getStudentResumesToApp: useCases.getStudentResumes
});

const deleteStudent=makeDeleteStudent({
    deleteStudentToApp: useCases.deleteStudent
})

const updateStudent=makeUpdateStudent({
    updateStudentToApp: useCases.updateStudent
})

const studentLogin=makeStudentLogin({
    studentLoginToApp: useCases.studentLogin,
    createJWT: useCases.createJWT
})

const verifyStudent = makeVerifyStudent({jwt})

const searchStudents = makeSearchStudents({
    searchStudentsToApp: useCases.searchStudents
})

const eligibleOpportunities = makeEligibleOpportunities({
    eligibleOpportunitiesToApp: useCases.eligibleOpportunities
})

const searchEligibleOpportunities = makeSearchEligibleOpportunities({
    searchEligibleOpportunitiesToApp: useCases.searchEligibleOpportunities
})

const forgotPassword = makeForgotPassword({
    forgotPasswordToApp: useCases.forgotPassword
})

const changePassword = makeChangePassword({
    changePasswordToApp: useCases.changePassword
})

const getStudentProfile = makeGetStudentProfile({
    getStudentProfileToApp: useCases.getStudentProfile
})

const getStudentApplications = makeGetStudentApplications({
    getStudentApplicationsToApp: useCases.getStudentApplications
})

const searchStudentApplications = makeSearchStudentApplications({
    searchStudentApplicationsToApp: useCases.searchStudentApplications
})


module.exports=Object.freeze({
    addStudent,
    addBulkStudents,
    getStudent,
    getAllStudents,
    getStudentResumes,
    deleteStudent,
    updateStudent,
    studentLogin,
    verifyStudent,
    searchStudents,
    eligibleOpportunities,
    searchEligibleOpportunities,
    forgotPassword,
    changePassword,
    getStudentProfile,
    getStudentApplications,
    searchStudentApplications
});