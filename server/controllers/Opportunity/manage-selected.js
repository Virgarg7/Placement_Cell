const makeManageSelected = ({ manageSelectedToApp }) => {
    return async function manageSelected(httpRequest) {
        const headers = {
            "Content-Type": "application/json",
        };
        try {
            // Add Opportunity and send response
            const response = await manageSelectedToApp({
                id: httpRequest.params.id,
                data: httpRequest.body,
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
                headers,
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: "Selection process managed successfully",
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

module.exports = makeManageSelected;
