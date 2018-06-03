'use strict';

/**
 * @param {Egg.Application} app - egg application
 */


module.exports = app => {
    const { router, controller } = app;

    // 中间件
    const isLogin = app.middlewares.checkLogin(app.config, app);


    router.get('/', controller.home.index);
    router.get('/getImg.html', controller.getImg.index);
    router.get('/getUserInfo.html', controller.user.find);
    router.get('/setUserInfo.html', isLogin,controller.user.updata);
    router.post("/scanImg.html", isLogin,controller.uploads.index);
    router.post("/login.html", controller.login.index);
    router.post("/register.html", controller.login.register);

};
