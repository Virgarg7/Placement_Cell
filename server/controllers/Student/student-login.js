const makeStudentLogin = ({ studentLoginToApp, createJWT }) => {
    return async function studentLogin(httpRequest) {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await studentLoginToApp({
                data: httpRequest.body,
            });

            // If response is not there then send 404 request
            if (response.invalid) {
                return {
                    statusCode: 400,
                    body: {
                        statusCode: 400,
                        error: "Invalid Email Id or Password...",
                    },
                };
            }

            // Create JWT
            const jwt = createJWT({
                data: {
                    id: response._id,
                    student: true,
                },
            });

            return {
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: `Student successfully logged in...`,
                    jwt: jwt,
                    data: {
                        id: response._id,
                        firstName: response.firstName,
                        lastName: response.lastName
                    }
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

module.exports = makeStudentLogin;
