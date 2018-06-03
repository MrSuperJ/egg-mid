/*
 * @Author: sl30828
 * @Date: 2017-10-19 13:50:16
 * @Last Modified by: sl30828
 * @Last Modified time: 2017-10-19 14:07:42
 */

'use strict';

module.exports = (options, app) => {
  return function*(next) {
    var cookie=getCookie(this.header.cookie)
    var token=cookie.token
    if(!token) {
      return this.body = {
        code:500,
        success:false,
        errMsg:"用户未登录"
      };
    }
    token=Buffer.from(cookie.token,"base64").toString()
    var findDatas = yield this.model.User.find({_id:token});
    var timestamp=Date.parse(new Date());
    if(this.header['user-agent']!=findDatas[0].lastLoginUA){ //校验UA
      return this.body = {
        code:500,
        success:false,
        errMsg:"需要用户重新登录"
      };
    }
    if(timestamp-findDatas[0].timestamp<10*60*1000) { //10分钟之内不用重复登录
      this._id=token;
      this.level=findDatas[0].level
    } else {
      return this.body = {
        code:500,
        success:false,
        errMsg:"用户登录已过期"
      };
    }
    yield next;
  };

};
var getCookie=function(cookie){
  var obj={}
  if(!cookie){
      return obj;
  };
  cookie.split('; ').forEach(x=>{
    if(x.indexOf('&')>-1) {
      console.log(x.indexOf('&'))
      var cook={}
      x.split('&').forEach(y=>{
        var z=  y.split("=")
        cook[z[0].trim()]=z[1]
      })
      obj[x.slice(0,x.indexOf('='))]
    } else {
      var z=  x.split("=")
      obj[z[0].trim()]=z[1]
    }
  })
  return obj
}
