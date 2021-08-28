const makeGetSelectionProcesses = ({ getSelectionProcessesToApp }) => {
    return async function getStudent(httpRequest) {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await getSelectionProcessesToApp({
                id: httpRequest.params.id,
            });

            // If response is not there then send 404 request
            if (!response) {
                return {
                    statusCode: 404,
                    body: {
                        statusCode: 404,
                        error: "Opportunity with given Id not found....",
                    },
                };
            }

            return {
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: "Selection Opportunitites Fetched...",
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

module.exports = makeGetSelectionProcesses;
