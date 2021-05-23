//our variables flow from .env.local over next.config.js to the client bundle

module.exports = {
    // distDir: "_next",
    generateBuildId: async () => {
        if (process.env.BUILD_ID) {
            return process.env.BUILD_ID;
        } else {
            return `${new Date().getTime()}`;
        }
    },
    trailingSlash: true,
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }

        return config
    },
    env: {
        APIKEY: process.env.APIKEY,
        AUTHDOMAIN: process.env.AUTHDOMAIN,
        PROJECTID: process.env.PROJECTID,
        STORAGEBUCKET: process.env.STORAGEBUCKET,
        MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
        APPID: process.env.APPID,
        MEASUREMENTID: process.env.MEASUREMENTID,
        DATABASEURL: process.env.DATABASEURL,
        CLIENTEMAIL: process.env.CLIENTEMAIL,
        PRIVATEKEY: process.env.PRIVATEKEY,
    },
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    future: {
        webpack5: true,
    },
};