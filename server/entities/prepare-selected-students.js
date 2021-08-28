const prepareSelectedStudentsEmail = ({data, emailIds}) => {
    
    const to= emailIds;
    const subject=`Congratulations!! You Cleared ${data.processName} round of ${data.companyName}`;
    const body=`
        <p>Congratulations!! You Cleared ${data.processName} round of ${data.companyName}</p>
        <br><br>
    `;
    return {to, subject, body};
}

module.exports = prepareSelectedStudentsEmail;