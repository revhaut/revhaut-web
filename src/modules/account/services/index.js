const userRegistration = require('./create-account.service');
const verifyUserAccount = require('./verify-account.service');
const fetchUserAccounts = require('./fetch-account.service');
module.exports = {
    userRegistration,
    verifyUserAccount,
    fetchUserAccounts,
};