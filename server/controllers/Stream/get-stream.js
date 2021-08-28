const makeGetStream = ({ getStreamToApp }) => {
    return async function getStream(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await getStreamToApp({ id: httpRequest.params.id });

            // If response is not there then send 404 request
            if (!response) {
                return {
                    statusCode: 404,
                    body: {statusCode: 404, error: "Stream with given Id not found...." }
                }
            }

            return {
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: 'Stream fetched successfully...',
                    data: response
                }
            }
        } catch (e) {
            return {
                headers,
                statusCode: 400,
                body: {
                    statusCode: 400,
                    error: e.message
                }
            }
        }
    }
}

module.exports = makeGetStream;