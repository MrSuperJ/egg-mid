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
                throw err;
            }
            // resDatas = this.formatDatas(resDatas)

            this.success(resDatas)
        }
        formatDatas(datas){
          return datas
        }
    }

}
