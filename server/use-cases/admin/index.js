const bcrypt = require("bcrypt");

const makeAdminLogin = require("./admin-login");
const makeAddAdmin = require("./add-admin");
const makeAdminDashboard = require('./dashboard')
const { db } = require("../../data-access");

//
const addAdmin = makeAddAdmin({ db, bcrypt });

const adminLogin = makeAdminLogin({ db, bcrypt });

const adminDashboard = makeAdminDashboard({db});

// Export use cases
module.exports = Object.freeze({
    addAdmin,
    adminLogin,
    adminDashboard
});
