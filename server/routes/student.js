const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const fs = require('fs');

const makeCallback = require('../express-callback');
const { student } = require('../controllers');


// // -> Multer Upload Storage
// global.__basedir = __dirname;
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, __basedir + '/uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
//     }
// });

// const upload = multer({storage: storage});

// Routes
router.post('/verify', makeCallback(student.verifyStudent));
router.post('/forgotPassword', makeCallback(student.forgotPassword));
router.post('/changePassword', makeCallback(student.changePassword));
router.post('/login',makeCallback(student.studentLogin));
router.post('/', makeCallback(student.addStudent));
router.get('/all', makeCallback(student.getAllStudents));
router.get('/search', makeCallback(student.searchStudents));
router.post('/bulk' ,makeCallback(student.addBulkStudents));
router.get('/:id', makeCallback(student.getStudent));
router.get('/:id', makeCallback(student.getStudent));
router.get('/:id/profile', makeCallback(student.getStudentProfile));
router.get('/:id/resumes', makeCallback(student.getStudentResumes));
router.get('/:id/opportunities', makeCallback(student.eligibleOpportunities));
router.get('/:id/opportunities/search', makeCallback(student.searchEligibleOpportunities));
router.get('/:id/applications', makeCallback(student.getStudentApplications));
router.get('/:id/applications/search', makeCallback(student.searchStudentApplications));
router.delete('/:id', makeCallback(student.deleteStudent));
router.put('/:id', makeCallback(student.updateStudent));


module.exports = router;