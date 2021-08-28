const makeAddOpportunity = ({ addOpportunityToApp }) => {
    return async function addOpportunity(httpRequest) {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        // Add Opportunity and send response
        const response = await addOpportunityToApp({ data: httpRequest.body });
  
        return {
          headers,
          statusCode: 200,
          body: {
            statusCode: 200,
            message: "Opportunity added successfully",
            data: response
          },
        };
      } catch (e) {
        return {
          headers,
          statusCode: 400,
          body: {
            statusCode: 400,
            error: e.message,
          },
        };
      }
    };
  };
  
  module.exports = makeAddOpportunity;
  