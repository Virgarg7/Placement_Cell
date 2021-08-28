const preparePlacedStudentsEmail = ({data, emailIds}) => {
    
    const to= emailIds;
    const subject=`Congratulations!! You placed in the ${data.companyName}`;
    const body=`
        <p>Congratulations!! You placed in the ${data.companyName}</p>
        <br><br>
    `;
    return {to, subject, body};
}

module.exports = preparePlacedStudentsEmail;