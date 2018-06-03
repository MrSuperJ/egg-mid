'use strict';
module.exports = app => {
    return class uploadsController extends app.ApiController {
        *index() {
            const {ctx} =this,
            reqParams=ctx.request.body,
            ua = ctx.header['user-agent'];
            var findDatas = yield this.ctx.model.User.find({userName:reqParams.userName});
            this.log('查询到的数据',findDatas)
            if(findDatas.length>0){
              var userData=findDatas[0]
              if(userData.userName!=reqParams.userName ||userData.password!=reqParams.password ){
                return this.fail(500,"账户或密码不正确")
              } else {
                var token=this.setToken(userData._id)
                userData.lastLogin={
                  ua:ua,
                  timestamp:Date.parse(new Date())
                }
                yield this.ctx.model.User.update({_id:userData._id},userData);
                this.success('登录成功！')
              }
            } else {
              return this.fail(500,"用户未注册")
            }
        }
    }

}
