const makeGetAllStreams = ({ getAllStreamsToApp }) => {
    return async function getStudent(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await getAllStreamsToApp();

            // If no student is there then send message no Streams found...
            if (response.length == 0) {
                return {
                    statusCode: 200,
                    body: { statusCode: 200,message: "No Streams Found...." }
                }
            }

            return {
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: 'All Streams successfully fetched...',
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

module.exports = makeGetAllStreams;