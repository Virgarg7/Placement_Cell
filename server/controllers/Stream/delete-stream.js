const makeDeleteStream = ({ deleteStreamToApp }) => {
    return async function deleteStream(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const response = await deleteStreamToApp({ id: httpRequest.params.id});

            // Check response has error
            if(response && response.error){
                return {
                    headers,
                    statusCode: 400,
                    body: {statusCode: 400, error: response.error }
                }
            }

            // If response is not there then send 404 request
            if (!response) {
                return {
                    headers,
                    statusCode: 404,
                    body: {statusCode: 404, error: "Stream with given Id not found...." }
                }
            }

            return {
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: 'Stream deleted successfully...',
                    data: response
                }
            }
        } catch (e) {
            return {
                headers,
                statusCode: 400,
                body: {
                    statusCode: 400,
                    error: 'Something went wrong...Please try again'
                }
            }
        }
    }
}

module.exports = makeDeleteStream;