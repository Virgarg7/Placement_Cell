const models = require("../models");
const mongoose = require("mongoose");
const db = ({ mongoDB }) => {
    return Object.freeze({
        addAdmin,
        checkAdminByEmail,
        addResume,
        deleteResume,
        getResume,
        updateResume,
        addStudent,
        addResumeToStudent,
        getStudent,
        getAllStudents,
        deleteResumeFromStudent,
        checkStudentByEmail,
        checkStudentExist,
        addBulkStudents,
        deleteStudent,
        updateStudent,
        addStream,
        getStream,
        getAllStreams,
        deleteStream,
        updateStream,
        addOpportunity,
        deleteOpportunity,
        getOpportunity,
        getAllOpportunities,
        getEligibleOpportunities,
        updateOpportunity,
        applyOpportunity,
        studentsOfStream,
        studentsOfStreamCount,
        getOpportunityApplicants,
        getSelectionProcesses,
        updateSelectedInSelectionProcess,
        managePlaced,
        updatePlacedStudents,
        fetchPlaced,
        getApplicants,
        getTotalCompaniesVisited,
        getTotalStudentsPlaced,
        getBranchWisePlaced,
        getTodayActivities,
        fetchSelectionProcessSelected,
        getBranchWisePlacedThisMonth,
        getBranchWiseOpportunitiesStats,
        getStudentProfile,
        getStudentsApplications,
        findEmailsFromStudentIds
    });

    async function addAdmin({ data }) {
        const result = await mongoDB.createDocument({
            model: models.Admin,
            data,
        });
        return result;
    }

    async function checkAdminByEmail({ email }) {
        const result = await mongoDB.findByQuery({
            model: models.Admin,
            query: { email },
        });
        return result;
    }

    async function addResume({ data }) {
        const result = await mongoDB.createDocument({
            model: models.Resume,
            data,
        });
        return result;
    }

    async function deleteResume({ id }) {
        const result = await mongoDB.deleteDocument({
            model: models.Resume,
            id,
        });
        return result;
    }

    async function getResume({ id }) {
        const result = await mongoDB.getDocument({
            model: models.Resume,
            id,
        });
        return result;
    }

    async function updateResume({ id, data }) {
        const result = await mongoDB.updateDocument({
            model: models.Resume,
            id,
            data,
        });
        return result;
    }

    async function addStudent({ data }) {
        const result = await mongoDB.createDocument({
            model: models.Student,
            data,
        });
        return result;
    }

    async function addResumeToStudent({ data }) {
        const student = await mongoDB.getDocument({
            model: models.Student,
            id: data.id,
        });
        if (!student) {
            throw new Error("User with given Id not found");
        }

        student.resumes.push({
            id: data.resumeId,
            name: data.name,
            date: data.date,
        });

        const result = await student.save();
        return result;
    }

    async function getStudent({ id, fields }) {
        if (!fields) {
            fields = "";
        }
        const result = await mongoDB.getDocument({
            model: models.Student,
            id,
            fields,
        });
        return result;
    }

    async function getStudentProfile({ id }) {
        const result = await models.Student.findById(id)
            .populate("stream")
            .populate("placedIn", "companyName roleName CTC")
            .select();
        return result;
    }

    async function getStudentsApplications({ id }) {
        const result = await models.Opportunity.find({
            "applicants.studentId": id,
        })
            .sort({ "applicants.appliedAt": "desc" })
            .select("companyName roleName applicants CTC");
        return result;
    }

    async function getAllStudents({ fields }) {
        if (!fields) {
            fields = "";
        }
        const result = mongoDB.searchAll({
            model: models.Student,
            fields,
            populateField: "stream",
        });
        return result;
    }

    async function deleteResumeFromStudent({ id, userId }) {
        const student = await mongoDB.getDocument({
            model: models.Student,
            id: userId,
        });
        if (!student) {
            throw new Error("User with given Id not found");
        }

        const index = student.resumes.findIndex((u) => u.id == id);
        student.resumes.splice(index, 1);

        const result = await student.save();
        return result;
    }

    async function checkStudentByEmail({ email }) {
        const result = await mongoDB.findByQuery({
            model: models.Student,
            query: { email },
        });
        return result;
    }

    async function checkStudentExist({ email }) {
        const result = await mongoDB.findByQueryCount({
            model: models.Student,
            query: { email },
        });
        return result;
    }

    async function addBulkStudents({ data }) {
        const result = await mongoDB.bulkInsert({
            model: models.Student,
            data,
        });
        return result;
    }

    async function deleteStudent({ id }) {
        const result = await mongoDB.deleteDocument({
            model: models.Student,
            id,
        });
        return result;
    }

    async function updateStudent({ id, data }) {
        const result = await mongoDB.updateDocument({
            model: models.Student,
            id,
            data,
        });
        return result;
    }

    // Streams
    async function addStream({ data }) {
        const result = await mongoDB.createDocument({
            model: models.Stream,
            data,
        });
        return result;
    }

    async function deleteStream({ id }) {
        const result = await mongoDB.deleteDocument({
            model: models.Stream,
            id,
        });
        return result;
    }

    async function getStream({ id }) {
        const result = await mongoDB.getDocument({
            model: models.Stream,
            id,
        });
        return result;
    }

    async function getAllStreams() {
        const result = mongoDB.searchAll({
            model: models.Stream,
            fields: "",
        });
        return result;
    }

    async function updateStream({ id, data }) {
        const result = await mongoDB.updateDocument({
            model: models.Stream,
            id,
            data,
        });
        return result;
    }

    async function studentsOfStream({ id }) {
        const result = await mongoDB.findByQuery({
            model: models.Student,
            query: { stream: id },
            fields: 'email'
        });
        return result;
    }
    
    async function studentsOfStreamCount({ id }) {
        const result = await mongoDB.findByQueryCount({
            model: models.Student,
            query: { stream: id },
        });
        return result;
    }

    // Opportunities
    async function addOpportunity({ data }) {
        const result = await mongoDB.createDocument({
            model: models.Opportunity,
            data,
        });
        return result;
    }

    async function deleteOpportunity({ id }) {
        const result = await mongoDB.deleteDocument({
            model: models.Opportunity,
            id,
        });
        return result;
    }

    async function getOpportunity({ id }) {
        // const result = await mongoDB.getDocument({
        //     model: models.Opportunity,
        //     populateField: "eligibleStreams",
        //     id,
        // });
        const result = await models.Opportunity.findById(id)
            .populate("eligibleStreams")
            .populate("placedStudents", "firstName lastName email")
            .select();
        return result;
    }

    async function getAllOpportunities() {
        const result = mongoDB.searchAll({
            model: models.Opportunity,
            fields: "companyName roleName CTC registrationLastDate applicants",
            sort: { postedAt: "desc" },
        });
        return result;
    }

    async function getEligibleOpportunities({ streamId }) {
        const result = await mongoDB.findByQuery({
            model: models.Opportunity,
            fields: "companyName roleName CTC registrationLastDate applicants",
            sort: { postedAt: "desc" },
            query: { eligibleStreams: streamId },
        });
        return result;
    }

    async function applyOpportunity({ id, data }) {
        const result = await mongoDB.updateDocument({
            model: models.Opportunity,
            id,
            data: { $push: { applicants: data } },
        });
        return result;
    }

    async function updateOpportunity({ id, data }) {
        const result = await mongoDB.updateDocument({
            model: models.Opportunity,
            id,
            data,
        });
        return result;
    }

    async function getOpportunityApplicants({ id }) {
        const result = await mongoDB.getDocument({
            model: models.Opportunity,
            id,
            populateField: "applicants.studentId",
        });
        return result;
    }

    async function getSelectionProcesses({ id }) {
        let result = await models.Opportunity.findById(id)
            .populate("selectionProcess.selected", "email")
            .populate("applicants.studentId", "email")
            .select(
                "companyName roleName CTC postedAt selectionProcess applicants.studentId"
            );
        result = JSON.stringify(result);
        result = JSON.parse(result);
        result.applicants = result.applicants.map((applicant) => {
            if(applicant.studentId){
                applicant.studentId.label = applicant.studentId.email;
                delete applicant.studentId.email;
                return applicant.studentId;
            }
        });

        for (let i = 0; i < result.selectionProcess.length; ++i) {
            result.selectionProcess[i].selected = result.selectionProcess[
                i
            ].selected.map((selected) => {
                selected.label = selected.email;
                delete selected.email;
                return selected;
            });
        }

        if (result.selectionProcess.length != 0) {
            result.processCompleted = result.selectionProcess[
                result.selectionProcess.length - 1
            ].completed
                ? true
                : false;
        } else {
            result.processCompleted = true;
        }
        return result;
    }


    async function updateSelectedInSelectionProcess({ id, data }) {
        let result = await mongoDB.getDocument({
            model: models.Opportunity,
            id,
        });

        // Find index of process id
        const index = result.selectionProcess.findIndex(
            (process) => process._id == data.processId
        );

        // If index is -1 then throw error
        if (index == -1) {
            throw new Error("Please provide valid process id");
        }

        // Update selected and completed
        result.selectionProcess[index].selected = data.selected;
        result.selectionProcess[index].completed = data.completed;

        // Save the results
        await mongoDB.save(result);

        // Fetch latest selection process result and return it
        result = await getSelectionProcesses({ id });
        return result;
    }

    async function managePlaced({ id, data }) {
        const result = await mongoDB.updateDocument({
            model: models.Opportunity,
            id,
            data,
        });

        return result;
    }

    async function getApplicants({ id }) {
        const result = await models.Opportunity.findById(id)
            .populate("applicants.studentId", "firstName lastName email")
            .select("companyName applicants");

        return result;
    }

    async function fetchPlaced({ id }) {
        const result = await models.Opportunity.findById(id)
            .populate("placedStudents", "firstName lastName email")
            .select("placedStudents");

        return result;
    }

    async function updatePlacedStudents({ id, placedStudents, data }) {
        // const result = await models.Student.updateMany({
        //     _id: {$in: placedStudents},
        //     data
        // });
        const result = await mongoDB.updateDocument({
            model: models.Student,
            id,
            data,
        });
        return result;
    }

    async function getTotalCompaniesVisited({ startingDate, endingDate }) {
        const result = await models.Opportunity.aggregate([
            { $match: { postedAt: { $gte: startingDate, $lt: endingDate } } },
            {
                $group: {
                    _id: {
                        year: { $substr: ["$postedAt", 0, 4] },
                        month: { $substr: ["$postedAt", 5, 2] },
                    },
                    companiesVisited: { $sum: 1 },
                },
            },
        ]);

        return result;
    }

    async function getTotalStudentsPlaced({ startingDate, endingDate }) {
        const result = await models.Student.aggregate([
            {
                $match: {
                    placed: true,
                    placedAt: { $gte: startingDate, $lt: endingDate },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $substr: ["$placedAt", 0, 4] },
                        month: { $substr: ["$placedAt", 5, 2] },
                    },
                    studentPlaced: { $sum: 1 },
                },
            },
        ]);

        return result;
    }

    async function getBranchWisePlaced({ stream }) {
        const result = await models.Student.aggregate([
            {
                $group: {
                    _id: stream,
                    studentsPlaced: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$stream", stream] },
                                        { $eq: ["$placed", true] },
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                    totalStudents: {
                        $sum: { $cond: [{ $eq: ["$stream", stream] }, 1, 0] },
                    },
                },
            },
        ]);

        return result;
    }

    async function getBranchWiseOpportunitiesStats({ stream }) {
        // const result = await models.Opportunity.aggregate([
        //     {
        //         $group: {
        //             _id: stream,
        //             totalOpportunities: {
        //                 $sum: {
        //                     $cond: [
        //                         { $eq: ["$eligibleStreams", stream] },
        //                         1,
        //                         0,
        //                     ],
        //                 },
        //             },
        //         },
        //     },
        // ]);
        const result = await mongoDB.findByQueryCount({
            model: models.Opportunity,
            query: { eligibleStreams: stream },
        });
        return result;
    }

    async function getBranchWisePlacedThisMonth({ date, stream }) {
        const result = await models.Student.aggregate([
            {
                $match: { placed: true, placedAt: { $gte: date } },
            },
            {
                $group: {
                    _id: stream,
                    studentsPlaced: {
                        $sum: {
                            $cond: [{ $eq: ["$stream", stream] }, 1, 0],
                        },
                    },
                },
            },
        ]);

        return result;
    }

    async function getTodayActivities({ startingDate, endingDate }) {
        // const result = await models.Opportunity.find({
        //     "selectionProcess.date": {$gte: date},
        // }).select("companyName selectionProcess");
        const result = await models.Opportunity.aggregate([
            {
                $match: {
                    "selectionProcess.date": { $gt: startingDate },
                    "selectionProcess.date": { $lt: endingDate },
                    // "selectionProcess.date": { $where: 'selectionProcess.date.toJSON().slice(0, 10) == "2021-05-17"' },
                },
            },
            {
                $project: {
                    _id: 0,
                    companyName: "$companyName",
                    selectionProcess: "$selectionProcess.name",
                    selectionProcessDate: "$selectionProcess.date",
                },
            },
            // { $unwind : "$selectionProcess" },
        ]);
        return result;
    }

    async function fetchSelectionProcessSelected({ id }) {
        const result = await models.Opportunity.findById(id)
            .populate("selectionProcess.selected", "firstName lastName email")
            .select("companyName selectionProcess");
        return result;
    }

    async function findEmailsFromStudentIds({data}){
        const result = await models.Student.find({_id: {$in: data}})
            .select("email");
        return result;
    }
};

module.exports = db;
