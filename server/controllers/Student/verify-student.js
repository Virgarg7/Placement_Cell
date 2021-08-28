const makeVerifyStudent = ({jwt}) => {
    return async function verifyStudent(httpRequest) {
        try {
            // If token is there then check JWT token is correct or not
            if (httpRequest.body.jwt) {
                const token = httpRequest.body.jwt;
                result = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

                // If result is there and he/she is student then send 200 OK response
                if (result && result.student == true) {
                    httpRequest.user = result;
                    return {
                        statusCode: 200,
                        body: {
                            statusCode: 200,
                            message: "Student Authenticated",
                        },
                    };
                } else {
                    return {
                        statusCode: 401,
                        body: {
                            statusCode: 401,
                            error: "Authentication error...Provide valid JWT",
                            authorized: false,
                        },
                    };
                }
            }
            // Send error if JWT token is not there
            else {
                return {
                    statusCode: 401,
                    body: {
                        statusCode: 401,
                        error: "Authentication error. Token required.",
                        authorized: false,
                    },
                };
            }
        } catch (err) {
            if (err.name == "JsonWebTokenError" || err.name == "TokenExpiredError") {
                return {
                    statusCode: 401,
                    body: {
                        statusCode: 401,
                        error: "Authentication error...Provide valid JWT",
                        authorized: false,
                    },
                };
            }
            console.log(err);
            return {
                statusCode: 500,
                body: {
                    statusCode: 500,
                    error: "Something went wrong... Plase try again",
                },
            };
        }
    };
};

module.exports = makeVerifyStudent;
