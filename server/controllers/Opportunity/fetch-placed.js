const makeFetchPlaced = ({ fetchPlacedToApp }) => {
    return async function fetchPlaced(httpRequest) {
        const headers = {
            "Content-Type": "application/json",
        };
        try {
            // fetch placed and send response
            const response = await fetchPlacedToApp({
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
                    message: "Placed students fetched successfully",
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

module.exports = makeFetchPlaced;
