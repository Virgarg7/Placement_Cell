const makeAddStream = ({ addStreamToApp }) => {
    return async function addStream(httpRequest) {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        // Add Stream and send response
        const response = await addStreamToApp({ data: httpRequest.body });
  
        return {
          headers,
          statusCode: 200,
          body: {
            statusCode: 200,
            message: "Stream added successfully",
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
  
  module.exports = makeAddStream;
  