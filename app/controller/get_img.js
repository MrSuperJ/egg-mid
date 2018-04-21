'use strict';

'use strict';
module.exports = app => {
    return class getImgController extends app.ApiController {
        index() {
            var data = [];
            var main = 'http://192.168.1.101:7001/public/imgs/0';
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
}