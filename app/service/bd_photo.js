'use strict';
var AipImageClassifyClient = require("baidu-aip-sdk").ocr;
// 设置APPID/AK/SK
var APP_ID = "11340961";
var API_KEY = "hIcZFt6dBSG7o01LBpUDbFef";
var SECRET_KEY = "Cqtkx7IrjCdf0jkC8pI5BpRnEKEYO2UF";
var HttpClient = require("baidu-aip-sdk").HttpClient;
var templateSign="2ce5d302e6c76ddc466f5ad0d2bcd351";

// 设置request库的一些参数，例如代理服务地址，超时时间等
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestOptions({ timeout: 5000 });

// 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
// 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestInterceptor(function(requestOptions) {
    // 查看参数
    console.log(requestOptions)
        // 修改参数
    requestOptions.timeout = 5000;
    // 返回参数
    return requestOptions;
});

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);


module.exports = app => {
    return class uploadsService extends app.ApiService {
        index(params) {
          // 调用通用文字识别, 图片参数为本地图片
            return client.custom(params,templateSign).then(res=>{
                var datas=res.data
                if(datas.isStructured){
                  return this.formatDatas(datas.ret)
                } else {

                }
            })
        }
        formatDatas(datas){
          if(datas.length<1) {

          }
          var obj={}
          datas.forEach(x=>{
            obj[x.word_name]=x.word
          })
          return obj
        }
    }

}
