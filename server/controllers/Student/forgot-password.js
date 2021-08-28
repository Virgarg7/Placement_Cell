const makeForgotPassword = ({ forgotPasswordToApp }) => {
    return async function forgotPassword(httpRequest) {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        // Forgot password
        await forgotPasswordToApp({ data: httpRequest.body });
        return {
          headers,
          statusCode: 200,
          body: {
            statusCode: 200,
            message: 'Password successfully changed, please check your email...',
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
  
  module.exports = makeForgotPassword;
  