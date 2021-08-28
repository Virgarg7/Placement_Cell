const makeAddBulkStudents = ({ addBulkStudentsToApp }) => {
    return async function addBulkStudents(httpRequest) {
        const headers = {
            "Content-Type": "application/json",
        };
        try {
            // Add bulk students and send response
            const response = await addBulkStudentsToApp({
                data: httpRequest.body,
            });

            return {
                headers,
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: "Students successfully added...",
                    data: response,
                },
            };
        } catch (e) {
            return {
                headers,
                statusCode: 400,
                body: {
                    statusCode: 400,
                    error: e.message,
                },
            };
        }
    };
};

module.exports = makeAddBulkStudents;
