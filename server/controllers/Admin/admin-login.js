const makeAdminLogin = ({ adminLoginToApp, createJWT }) => {
    return async function adminLogin(httpRequest) {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await adminLoginToApp({
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
                    admin: true,
                },
            });

            return {
                statusCode: 200,
                body: {
                    statusCode: 200,
                    message: `Admin successfully logged in...`,
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

module.exports = makeAdminLogin;
