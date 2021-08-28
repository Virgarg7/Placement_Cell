const prepareForgotPasswordEmail = ({data}) => {
    
    const to= data.email;
    const subject="New Password for placement tracker";
    const body=`
        <p>
        This is your updated account credentials for Placement Tracker <br><br>
        <b>Email Id:</b> ${to} <br>
        <b>Password:</b> ${data.actualPassword}
        </p>
    `;
    return {to, subject, body};
}

module.exports = prepareForgotPasswordEmail;