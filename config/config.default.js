'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1523970087310_229';

    // add your config here
    config.middleware = [];

    config.cors = {
        origin: '*',
        allowMethods: 'GET,POST'
    }
    config.security = {
        csrf: false,
        xssProtection: false,
        xframe: false,
        domainWhiteList: ['http://localhost:8081'],
    };
    config.mongoose = {
        url: 'mongodb://127.0.0.1/ex',
        options: {},
    };
    // recommended
    config.mongoose = {
        client: {
            url: 'mongodb://127.0.0.1/ex',
            options: {},
        },
    };

    return config;
};
