const { prepareNewOpportunityEmail } = require("../../entities");

module.exports = function makeAddOpportunity({ db, sendEmailQueue }) {
    return async function addOpportunity({ data }) {
        // Add Opportunity
        data.postedAt = new Date();
        const response = await db.addOpportunity({ data });
        if (response) {
            let emailIds = [];
            for (let stream of data.eligibleStreams) {
                let emails = await db.studentsOfStream({ id: stream });
                emails = emails.map((data) => data.email);
                if (emails.length > 0) {
                    emailIds = [...emailIds, ...emails];
                }
            }

            const emailInfo = prepareNewOpportunityEmail({ data, emailIds});
            sendEmailQueue.add(emailInfo);
        }
        return response;
    };
};
