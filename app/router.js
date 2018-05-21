'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/getImg.html', controller.getImg.index);
    router.get('/getUserInfo.html', controller.user.find);
    router.get('/setUserInfo.html', controller.user.updata);

};
