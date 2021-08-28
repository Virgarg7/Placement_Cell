module.exports = function makeAdminLogin({ db, bcrypt }) {
    return async function adminLogin({ data }) {
        const admin=await db.checkAdminByEmail({ email: data.email });
        if(admin.length==0){  
            return {invalid: "Admin with given email id is not exist"}
        }

        const isValidPassword=await bcrypt.compare(data.password,admin[0].password);
        if(!isValidPassword){return {invalid: "Please Enter Valid Password"};}


        return admin[0];
    }
}