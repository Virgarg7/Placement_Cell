const generatePassword = ({ passwordGenerator }) => {
    const password = passwordGenerator.generate({
        length: 12,
        lowercase: true,
        uppercase: true,
        numbers: true,
        excludeSimilarCharacters: true
    });

    return password;
}

module.exports = generatePassword;