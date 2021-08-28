module.exports = function makeSendEmailApplicants({
    db,
    sendEmailQueue,
    marked,
}) {
    return async function sendEmailApplicants({ id, data }) {
        if (!data.subject || !data.body) {
            throw new Error("Please provide subject and body");
        }
        const response = await db.getOpportunityApplicants({ id });
        const emailIds = response.applicants.map(
            (applicant) => applicant.studentId.email
        );
        const email = {
            to: emailIds,
            subject: data.subject,
            body: marked(data.body),
        };

        sendEmailQueue.add(email);

        return "Done";
    };
};
