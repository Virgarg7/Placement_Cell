module.exports = function makeStudentLogin({ db, bcrypt }) {
    return async function studentLogin({ data }) {
        const student=await db.checkStudentByEmail({ email: data.email });
        if(student.length==0){  
            return {invalid: "Student with given email id is not exist"}
        }

        const isValidPassword=await bcrypt.compare(data.password,student[0].password);
        if(!isValidPassword){return {invalid: "Please Enter Valid Password"};}


        return student[0];
    }
}