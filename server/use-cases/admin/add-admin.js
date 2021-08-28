const { encryptPassword} = require('../../entities');

module.exports = function makeAddAdmin({ db, bcrypt }) {
    return async function addAdmin({ data }) {
        // Encrypt Password
        data.password = await encryptPassword({ bcrypt, password: data.password });

        // Add admin
        const response = await db.addAdmin({ data });

        return response;
    }
}