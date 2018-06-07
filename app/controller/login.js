'use strict';
module.exports = app => {
    return class uploadsController extends app.ApiController { *
        index() {
                const { ctx } = this,
                reqParams = ctx.request.body,
                    ua = ctx.header['user-agent'];
                var findDatas = yield this.ctx.model.User.find({ userName: reqParams.userName });
                // this.log('查询到的数据', findDatas)
                if (findDatas.length > 0) {
                    var userData = findDatas[0]
                    if (userData.userName != reqParams.userName || userData.password != reqParams.password) {
                        return this.fail(500, "账户或密码不正确")
                    } else {
                        var token = this.setToken(userData._id)
                        userData.lastLoginUA = ua
                        userData.timestamp = Date.parse(new Date());
                        yield this.ctx.model.User.update({ _id: userData._id }, userData);
                        return this.success({
                            nickName: userData.nickname,
                            sex: userData.sex,
                            mobile: userData.mobile,
                            level: userData.level,
                        })
                    }
                } else {
                    return this.fail(500, "用户未注册")
                }
            } *
            register() {
                const { ctx } = this,
                body = ctx.request.body,
                    query = ctx.request.query;
                var reqParams = body.userName ? body : query,
                    { userName, password, sex, mobile, nickName } = reqParams;
                this.log("body", reqParams)
                this.log("query", query)
                if (reqParams.userName == "") return this.fail(500, "用户名不能为空")
                if (reqParams.password == "") return this.fail(500, "密码不能为空")
                if (reqParams.sex == "") return this.fail(500, "性别不能为空")
                if (reqParams.mobile == "") return this.fail(500, "手机号不能为空")
                if (reqParams.nickName == "") return this.fail(500, "昵称不能为空")

                var findUserName = yield this.ctx.model.User.find({ userName: userName });
                var findMobile = yield this.ctx.model.User.find({ mobile: mobile });
                if (findUserName.length > 0) return this.fail(500, '用户名已存在');
                if (findMobile.length > 0) return this.fail(500, '手机号码已存在');
                var userData = yield this.ctx.model.User.create({
                    userName,
                    password,
                    sex,
                    mobile,
                    level: 1,
                    nickname: nickName
                })
                this.setToken(userData._id)
                return this.success("注册成功")
            }
    }

}