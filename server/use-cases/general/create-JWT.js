module.exports = function makeCreateJWT({ jwt }) {
    return function createJWT({ data }) {
        // Add iat
        data.iat = Date.now();

        // Get secret key and expires in
        const secretKey = process.env.JWT_PRIVATE_KEY;
        const expiresIn = process.env.JWT_EXPIRES_IN;

        // Sign JWT token
        const jwtToken = jwt.sign(data, secretKey, { expiresIn });

        // return data which contains name, data and options where data is jwt token and all these fields are used to set JWT in cookie
        return jwtToken;
    };
};
