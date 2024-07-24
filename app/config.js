const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    urlDb: process.env.URL_MONGODB_DEV,
    jwtExpiration: '1d',
    jwtSecret: 'jwtsecret',
    clientKeyMidtrans: process.env.CLIENT_KEY_MIDTRANS,
    serverKeyMidtrans: process.env.SERVER_KEY_MIDTRANS
    // gmail: process.env.EMAIL,
    // password: process.env.PASSWORD,
}