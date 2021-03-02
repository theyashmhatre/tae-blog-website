//our variables flow from .env.local over next.config.js to the client bundle

module.exports = {
    trailingSlash: true,
    env: {
        APIKEY: process.env.APIKEY,
        AUTHDOMAIN: process.env.AUTHDOMAIN,
        PROJECTID: process.env.PROJECTID,
        STORAGEBUCKET: process.env.STORAGEBUCKET,
        MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
        APPID: process.env.APPID,
        MEASUREMENTID: process.env.MEASUREMENTID
    },
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
};