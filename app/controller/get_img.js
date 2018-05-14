'use strict';
module.exports = app => {
    return class getImgController extends app.ApiController {
        index() {
            var data = [];
            var main = getIPAdress() + '/public/imgs/0';
            for (var i = 1; i < 5; i++) {
                var arr = [];
                for (var j = 1; j < 50; j++) {
                    arr.push({
                        url: main + `${i}/${j}.jpg`
                    })

                }
                data.push(arr)
            }
            this.success(data)
        }
    }

    function getIPAdress() {
        var interfaces = require('os').networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
}