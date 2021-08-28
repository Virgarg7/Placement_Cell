const {
    prepareSelectedStudentsEmail,
    preparePlacedStudentsEmail,
} = require("../../entities");

module.exports = function makeManageSelected({ db, sendEmailQueue }) {
    return async function manageSelected({ id, data }) {
        const response = await db.updateSelectedInSelectionProcess({
            id,
            data,
        });
        if (response && response.processCompleted) {
            await db.managePlaced({
                id,
                data: { placedStudents: data.selected },
            });

            for (let studentId of data.selected) {
                const a = await db.updatePlacedStudents({
                    id: studentId,
                    placedStudents: data.selected,
                    data: {
                        placed: true,
                        placedAt: new Date(),
                        placedIn: id,
                    },
                });

                let emailIds = await db.findEmailsFromStudentIds({
                    data: data.selected,
                });

                emailIds = emailIds.map((data) => data.email);

                const emailData = {
                    companyName: response.companyName,
                };
                const emailInfo = preparePlacedStudentsEmail({
                    data: emailData,
                    emailIds,
                });

                sendEmailQueue.add(emailInfo);
            }
        } else if (response) {
            let emailIds = await db.findEmailsFromStudentIds({
                data: data.selected,
            });
            emailIds = emailIds.map((data) => data.email);

            const process = response.selectionProcess.find(
                (process) => process._id == data.processId
            );

            const emailData = {
                companyName: response.companyName,
                processName: process.name,
            };
            const emailInfo = prepareSelectedStudentsEmail({
                data: emailData,
                emailIds,
            });

            sendEmailQueue.add(emailInfo);
        }

        return response;
    };
};
