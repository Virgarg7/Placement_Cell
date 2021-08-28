const {encryptPassword} = require('../../entities');

module.exports = function makeChangePassword({ db, bcrypt}) {
    return async function changePassword({ data }) {
        // Encrypt Password
        data.password = await encryptPassword({ bcrypt, password: data.password });

        // Update Password
        const response = await db.updateStudent({id: data.id, data: {password: data.password}});

        return response;
    }
}
