const makeSearchEligibleOpportunities = ({ searchEligibleOpportunitiesToApp }) => {
    return async function searchEligibleOpportunities(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await searchEligibleOpportunitiesToApp({id: httpRequest.params.id, term: httpRequest.query.term});

            if(!response){
                return {
                    statusCode: 400,
                    body: { statusCode: 400,message: "Student with given id not found...." }
                }
            }

            // If no student is there then send message no Opportunities found...
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
                    error: e.message
                }
            }
        }
    }
}

module.exports = makeSearchEligibleOpportunities;