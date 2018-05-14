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
    // config.redis = {
    //         clients: {
    //             foo: { // instanceName. See below
    //                 port: 6379, // Redis port
    //                 host: '127.0.0.1', // Redis host
    //                 password: 'auth',
    //                 db: 0,
    //             },
    //             bar: {
    //                 port: 6379,
    //                 host: '127.0.0.1',
    //                 password: 'auth',
    //                 db: 1,
    //             },
    //         }
    //     }
    // 
    return config;
};