const bcrypt = require('bcryptjs');
const passwordGenerator = require('generate-password');

const saltRounds = 10;

const getPassword = ({ length = 10, numbers = true }) => {
    return passwordGenerator.generate({ length, numbers });
};

const hashPassword = password => {
    return bcrypt.hashSync(password, saltRounds);
};

const generateHashedPassword = async() => {
    const password = await getPassword({});
    const hashedPassword = await hashPassword(password);

    return { password, hashedPassword };
};

const validatePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = { getPassword, hashPassword, generateHashedPassword, validatePassword };