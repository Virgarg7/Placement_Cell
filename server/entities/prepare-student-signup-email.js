const prepareStudentSignupEmail = ({data}) => {
    
    const to= data.email;
    const subject="Welcome to Placement Tracker";
    const body=`
        <p>Hello, ${data.firstName} ${data.lastName} <br><br>
        Welcome to Placement Tracker. This is your account credentials. <br><br>
        <b>Email Id:</b> ${to}
        <b>Password:</b> ${data.actualPassword}

        <br><br>
        Hope you will placed into your dream company. Best of luck for your placements. 

        </p>
    `;
    return {to, subject, body};
}

module.exports = prepareStudentSignupEmail;