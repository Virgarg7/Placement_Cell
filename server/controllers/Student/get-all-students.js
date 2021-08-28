const makeGetAllStudents = ({ getAllStudentsToApp }) => {
    return async function getStudent(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await getAllStudentsToApp();

            // If no student is there then send message no students found...
            if (response.length == 0) {
                return {
                    statusCode: 200,
                    body: { statusCode: 200,message: "No Students Found...." }
                }
            }

            return {
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: 'All Students successfully fetched...',
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

module.exports = makeGetAllStudents;