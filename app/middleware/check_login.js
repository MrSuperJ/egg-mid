/*
 * @Author: sl30828
 * @Date: 2017-10-19 13:50:16
 * @Last Modified by: sl30828
 * @Last Modified time: 2017-10-19 14:07:42
 */

'use strict';

module.exports = (options, app) => {
  return function*(next) {
    this.token = this.ctx.header.cookie;
    yield next;
  };
};
