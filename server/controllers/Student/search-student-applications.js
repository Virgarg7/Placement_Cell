const makeSearchStudentApplications = ({ searchStudentApplicationsToApp }) => {
    return async function searchStudentApplications(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await searchStudentApplicationsToApp({ id: httpRequest.params.id, term: httpRequest.query.term });

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
                    message: `Student's applications successfully fetched...`,
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

module.exports = makeSearchStudentApplications;