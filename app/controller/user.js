module.exports = app => {
    return class getMongodb extends app.ApiController {
        *find() {
        const {ctx} =this,
        reqParams=ctx.query;
        var datas = yield this.ctx.model.User.find(reqParams);
          this.success(datas)
        }
        *updata(){
          const {ctx} =this,
          reqParams=ctx.query;
          if(!reqParams.userName) return this.success('userName参数不能为空')
          var datas = yield this.ctx.model.User.find({userName:reqParams.userName});
          try{
            if(Array.isArray(datas)&&datas[0]._id) {
              yield this.ctx.model.User.update(reqParams)
              this.success('更新成功')
            } else {
              yield this.ctx.model.User.create(reqParams)
              this.success('创建成功')
            }
          } catch(err){
              // this.success(err)
          }

        }
        *apiUSE(){
          yield this.ctx.model.User.remove({userName:'sj'})  //删除
          yield this.ctx.model.User.create({userName:'superJ',password:"1232"})  //创建
          yield this.ctx.model.User.find({userName:'sj'});  // 查询
        }
    }
}
