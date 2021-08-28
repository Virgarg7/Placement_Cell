const prepareNewOpportunityEmail = ({data, emailIds}) => {
    
    const to= emailIds;
    const subject="New Opportunity Available";
    const body=`
        <p><b>${data.companyName}</b> is coming your college for <b>${data.roleName} Role</b>.<br><br>
        <p>${data.companyName} is offering ${data.CTC} CTC.<br><br>
        
        <p> Apply before registration ends. To apply in this company go to eligible opportunities section of your placement tracker and apply.</p> 
        </p>
    `;
    return {to, subject, body};
}

module.exports = prepareNewOpportunityEmail;