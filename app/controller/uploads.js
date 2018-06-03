'use strict';
const sendToWormhole = require('stream-wormhole');
const toArray = require('stream-to-array');
module.exports = app => {
    return class uploadsController extends app.ApiController {
        *index() {
            const stream = yield this.ctx.getFileStream();
            let buf,resDatas;
            try { // 获取文件流转化base64
                const parts = yield toArray(stream);
                buf = Buffer.concat(parts);
            } catch (err) {
                yield sendToWormhole(stream);
                throw err;
            }
            var base64 = buf.toString('base64')
            try {
              resDatas=yield this.ctx.service.bdPhoto.index(base64)
            } catch (err) {
                this.fail(500,err);
            }
            try{
              yield this.ctx.model.User.update({_id:this.ctx._id},{aliPay:resDatas});
            } catch(err){
              this.log('err',err)
            }
            var find=yield this.ctx.model.User.find({_id:this.ctx._id})
            this.success("扫描成功！")
        }
        formatDatas(datas){
          return datas
        }
    }

}
