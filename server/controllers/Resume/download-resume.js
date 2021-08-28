const makeDownloadResume = ({ downloadResumeToApp }) => {
    return async function downloadResume(httpRequest) {
        
        try {
            const response = await downloadResumeToApp({ id: httpRequest.params.id });

            // If response is not there then send 404 request
            if (!response) {
                return {
                    statusCode: 404,
                    body: {statusCode: 404, error: "Resume with given Id not found...." }
                }
            }
            const headers = {
                'Content-Type': 'application/pdf',
                'Content-Length': response.length
            }

            return {
                headers,
                statusCode: 200,
                body: response
            }
        } catch (e) {
            return {
                statusCode: 400,
                body: {
                    statusCode: 400,
                    error: e.message
                }
            }
        }
    }
}

module.exports = makeDownloadResume;