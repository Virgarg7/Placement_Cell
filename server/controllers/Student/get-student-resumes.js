const makeGetStudentResumes = ({ getStudentResumesToApp }) => {
    return async function getStudentResumes(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await getStudentResumesToApp({ id: httpRequest.params.id });

            // If response is not there then send 404 request
            if (!response) {
                return {
                    statusCode: 404,
                    body: {statusCode: 404, error: "Student with given Id not found...." }
                }
            }
            return {
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: `Student's resumes successfully fetched...`,
                    data: response.resumes
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

module.exports = makeGetStudentResumes;