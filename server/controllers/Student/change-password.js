const makeChangePassword = ({changePasswordToApp }) => {
    return async function changePassword(httpRequest) {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        // Forgot password
        const response = await changePasswordToApp({ data: httpRequest.body });

        // If response is not there then send 404 request
        if (!response) {
            return {
                headers,
                statusCode: 404,
                body: { statusCode: 404,error: "Student with given Id not found...." }
            }
        }

        return {
          headers,
          statusCode: 200,
          body: {
            statusCode: 200,
            message: 'Password successfully changed...',
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
  
  module.exports = makeChangePassword;
  