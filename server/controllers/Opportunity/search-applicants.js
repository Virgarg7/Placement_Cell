const makeSearchApplicants = ({ searchApplicantsToApp }) => {
    return async function searchApplicants(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await searchApplicantsToApp({id: httpRequest.params.id, term: httpRequest.query.term});

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

            // If no student is there then send message no students found...
            if (response.length == 0) {
                return {
                    statusCode: 200,
                    body: { statusCode: 200,message: "No Applicants Found...." }
                }
            }

            return {
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: 'Applicants successfully fetched...',
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

module.exports = makeSearchApplicants;