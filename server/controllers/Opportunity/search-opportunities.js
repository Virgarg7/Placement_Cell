const makeSearchOpportunities = ({ searchOpportunititesToApp }) => {
    return async function searchOpportunitites(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await searchOpportunititesToApp({term: httpRequest.query.term});

            // If no student is there then send message no students found...
            if (response.length == 0) {
                return {
                    statusCode: 200,
                    body: { statusCode: 200,message: "No Opportunities Found...." }
                }
            }

            return {
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: 'All Opportunities successfully fetched...',
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

module.exports = makeSearchOpportunities;