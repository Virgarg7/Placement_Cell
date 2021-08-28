const jwt = require('jsonwebtoken');

const useCases=require('../../use-cases');
const makeAddAdmin = require('./add-admin');
const makeAdminLogin = require('./admin-login');
const makeVerifyAdmin = require('./verify-admin');
const makeAdminDashboard = require('./dashboard');

const addAdmin=makeAddAdmin({
    addAdminToApp: useCases.addAdmin
});

const adminLogin=makeAdminLogin({
    adminLoginToApp: useCases.adminLogin,
    createJWT: useCases.createJWT
})

const verifyAdmin = makeVerifyAdmin({jwt})

const adminDashboard = makeAdminDashboard({
    adminDashboardToApp: useCases.adminDashboard
})

module.exports=Object.freeze({
    addAdmin,
    adminLogin,
    verifyAdmin,
    adminDashboard
});