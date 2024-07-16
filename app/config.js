const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    urlDb: process.env.URL_MONGODB_DEV,
    jwtExpiration: '2h',
    jwtSecret: 'jwtsecret',
    // gmail: process.env.EMAIL,
    // password: process.env.PASSWORD,
}