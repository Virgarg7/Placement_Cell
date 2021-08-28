const makeUpdateProfileImage = ({ updateProfileImageToApp }) => {
  return async function updateProfileImage(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await updateProfileImageToApp({
        id: httpRequest.params.id,
        filename: httpRequest.file.filename,
      });
      // If response is not there then send 404 request
      if (!response) {
        return {
          statusCode: 404,
          body: {
            statusCode: 404,
            error: "Resume with given Id not found....",
          },
        };
      }

      return {
        headers,
        statusCode: 200,
        body: {
          statusCode: 200,
          message: `Resume's Profile Image Updated successfully...`,
          data: response,
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

module.exports = makeUpdateProfileImage;
