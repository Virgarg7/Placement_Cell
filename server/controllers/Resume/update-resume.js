const makeUpdateResume = ({ updateResumeToApp }) => {
    return async function updateResume(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const response = await updateResumeToApp({
                id: httpRequest.params.id, data: httpRequest.body
            });

            // If response is not there then send 404 request
            if (!response) {
                return {
                    statusCode: 404,
                    body: {statusCode: 404, error: "Resume with given Id not found...." }
                }
            }

            return {
                headers,
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: 'Resume Updated successfully...',
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

module.exports = makeUpdateResume;