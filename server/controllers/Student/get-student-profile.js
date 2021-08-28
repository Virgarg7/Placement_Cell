const makeGetStudentProfile = ({ getStudentProfileToApp }) => {
    return async function getStudentProfile(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await getStudentProfileToApp({ id: httpRequest.params.id });

            // If response is not there then send 404 request
            if (!response) {
                return {
                    statusCode: 404,
                    body: {statusCode: 404, error: "User with given Id not found...." }
                }
            }

            return {
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: `Student Profile successfully fetched...`,
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

module.exports = makeGetStudentProfile;