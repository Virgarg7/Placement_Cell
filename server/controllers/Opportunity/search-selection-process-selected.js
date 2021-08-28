const makeSearchSelectionProcessSelected = ({ searchSelectionProcessSelectedToApp }) => {
    return async function searchSelectionProcessSelected(httpRequest) {
        const headers = {
            "Content-Type": "application/json",
        };
        try {
            // fetch placed and send response
            const response = await searchSelectionProcessSelectedToApp({
                id: httpRequest.params.id,
                processId: httpRequest.params.processId,
                term: httpRequest.query.term
            });

            // If response is not there then send 404 request
            if (!response) {
                return {
                    statusCode: 404,
                    body: {
                        statusCode: 404,
                        error: "Process with given process id & opportunity id not found....",
                    },
                };
            }

            return {
                headers,
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: "Selected Applicants in Selection Process Successfully fetched",
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

module.exports = makeSearchSelectionProcessSelected;
