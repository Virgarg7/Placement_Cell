const makeApplyOpportunity = ({ applyOpportunityToApp }) => {
    return async function applyOpportunity(httpRequest) {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        // Add user and send response
        const response = await applyOpportunityToApp({id: httpRequest.params.id ,data: httpRequest.body});
  
        return {
          headers,
          statusCode: 200,
          body: {
            statusCode: 200,
            message: 'Applied Successfully',
            data: response
        }
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
  
  module.exports = makeApplyOpportunity;
  