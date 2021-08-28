module.exports = function makeAdminDashboard({ db }) {
    return async function adminDashboard() {
        const allStreams = await db.getAllStreams();

        let response = {};

        response.totalCompaniesVisited = await getTotalCompaniesVisited({ db });
        response.totalStudentsPlaced = await getTotalStudentsPlaced({ db });
        response.branchWisePlaced = await getBranchWisePlaced({
            db,
            allStreams,
        });
        response.branchesThisMonth = await getAllBranchesThisMonth({
            db,
            allStreams,
        });
        response.branchWiseStatistics = await getBranchWiseStatistics({
            db,
            allStreams,
        });
        response.todayActivities = await getTodayActivities({ db });
        return response;
    };
};

const getTotalCompaniesVisited = async ({ db, data }) => {
    let custom = false;
    let startingDate, endingDate;

    // Set Starting and Ending Date
    if (data && data.startingDate && data.endingDate) {
    } else {
        // Specify Starting and Ending Date
        endingDate = new Date();
        startingDate = new Date();
        startingDate.setMonth(startingDate.getMonth() - 5);
        startingDate.setDate(1);
        custom = true;
    }

    // Fetch Companies visited
    let totalCompaniesVisited = await db.getTotalCompaniesVisited({
        startingDate,
        endingDate,
    });
    totalCompaniesVisited = JSON.stringify(totalCompaniesVisited);
    totalCompaniesVisited = JSON.parse(totalCompaniesVisited);

    // Format the response
    totalCompaniesVisited = formatResponse({
        startingDate,
        endingDate,
        data: totalCompaniesVisited,
        dataTitle: "companiesVisited",
    });
    return totalCompaniesVisited;
};

const getTotalStudentsPlaced = async ({ db, data }) => {
    // Set starting and ending date
    let startingDate, endingDate;
    if (data && data.startingDate && data.endingDate) {
    } else {
        // Specify Starting and Ending Date
        endingDate = new Date();
        startingDate = new Date();
        startingDate.setMonth(startingDate.getMonth() - 5);
        startingDate.setDate(1);
        custom = true;
    }

    // Fetch Students Placed
    let totalStudentsPlaced = await db.getTotalStudentsPlaced({
        startingDate,
        endingDate,
    });
    totalStudentsPlaced = JSON.stringify(totalStudentsPlaced);
    totalStudentsPlaced = JSON.parse(totalStudentsPlaced);

    // Format response
    totalStudentsPlaced = formatResponse({
        startingDate,
        endingDate,
        data: totalStudentsPlaced,
        dataTitle: "studentPlaced",
    });
    return totalStudentsPlaced;
};

const formatResponse = ({ startingDate, endingDate, data, dataTitle }) => {
    // Set id to YYYY-MM format
    data = data.map((obj) => {
        obj._id = `${obj._id.year}-${obj._id.month}`;
        return obj;
    });

    // Sort data
    data.sort((a, b) => (a._id > b._id ? 1 : -1));

    // If some month data is not there then set that data to 0
    let index = 0;
    const response = [];
    while (startingDate <= endingDate) {
        const key =
            startingDate.getFullYear() +
            "-" +
            String(startingDate.getMonth() + 1).padStart(2, "0");

        if (index >= data.length || data[index]._id != key) {
            response.push({
                _id: key,
                [dataTitle]: 0,
            });
        } else {
            response.push(data[index]);
            ++index;
        }
        startingDate.setMonth(startingDate.getMonth() + 1);
    }
    return response;
};

const getBranchWisePlaced = async ({ db, allStreams }) => {
    const branchWisePlaced = [];

    // Loop through all streams
    for (let stream of allStreams) {
        const response = await db.getBranchWisePlaced({ stream: stream._id });

        // If response length is greater than 0
        if (response.length > 0) {
            // Set the ratio
            let ratio;
            if (response[0].studentsPlaced == 0) {
                ratio = "0%";
            } else {
                ratio = `${(
                    ((response[0].studentsPlaced || 0) * 100) /
                    response[0].totalStudents
                ).toFixed(2)}%`;
            }

            // Push formatted object
            branchWisePlaced.push({
                name: `${stream.degree}-${stream.major}-${stream.sem}`,
                studentsPlaced: response[0].studentsPlaced,
                totalStudents: response[0].totalStudents,
                ratio: ratio,
            });
        }
    }
    return branchWisePlaced;
};

const getAllBranchesThisMonth = async ({ db, allStreams }) => {
    const branchesThisMonth = [];

    // Fetch current date
    const date = new Date();
    date.setDate(1);

    // Loop through all streams
    for (let stream of allStreams) {
        // Get response
        const response = await db.getBranchWisePlacedThisMonth({
            date,
            stream: stream._id,
        });

        // Set response
        if (response.length > 0) {
            branchesThisMonth.push({
                _id: `${stream.degree}-${stream.major}-${stream.sem}`,
                studentsPlaced: response[0].studentsPlaced,
            });
        } else {
            branchesThisMonth.push({
                _id: `${stream.degree}-${stream.major}-${stream.sem}`,
                studentsPlaced: 0,
            });
        }
    }
    return branchesThisMonth;
};

const getBranchWiseStatistics = async ({ db, allStreams }) => {
    const branchWiseStatistics = [];

    // Loop through all streams
    for (let stream of allStreams) {
        const response = await db.getBranchWisePlaced({ stream: stream._id });
        const totalOpportunities = await db.getBranchWiseOpportunitiesStats({ stream: stream._id });

        const object = {
            _id: `${stream.degree}-${stream.major}-${stream.sem}`
        }
        if(response.length > 0){
            object.studentsPlaced = response[0].studentsPlaced;
            object.totalStudents = response[0].totalStudents;
        }
        else{
            object.studentsPlaced = 0;
            object.totalStudents = 0;
        }

         object.totalOpportunities = totalOpportunities;
        
        
        // Push formatted object
        branchWiseStatistics.push(object);
    }
    return branchWiseStatistics;
};

const getTodayActivities = async ({ db }) => {
    const startingDate = new Date();
    startingDate.setHours(0, 0, 0, 0);
    const endingDate = new Date();
    endingDate.setHours(23, 59, 59, 999);

    let todayActivities = await db.getTodayActivities({ startingDate, endingDate });
    // console.log(todayActivities);
    // todayActivities = todayActivities.map((activity)=>{
    //     activity.selectionProcess.find(act => act._id == )
    //     const a = `${activity.name} of ${todayActivities.companyName}`
    //     return a;
    // })
    return todayActivities;
};
