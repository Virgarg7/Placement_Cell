const makeAddStudent = ({ addStudentToApp }) => {
  return async function addStudent(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      // Add user and send response
      const response = await addStudentToApp({ data: httpRequest.body });

      return {
        headers,
        statusCode: 200,
        body: {
          statusCode: 200,
          message: 'Student successfully added...',
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

module.exports = makeAddStudent;
