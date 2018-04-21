/**
 *  @index入口 file
 *  ---------------------------------------------
 *  Author : dinglei
 *  Mail   : dl47057@ly.com
 *  Date   : 2017-04-21
 */

'use strict';

// require('apm-agent-nodejs');

const assert = require('assert');
const crypto = require('crypto');
const _ = require('underscore');

// const initWrapper = require('./app/lib/wrapper');
// const RemoteTWTransport = require('./lib/twlogger');

module.exports = app => {
    class CustomController extends app.Controller {
        success(data) {
            if (data === null || typeof data === 'undefined') {
                this.ctx.body = this.ctx.body || '';
            } else {
                this.ctx.body = data;
            }
        }

        fail(code, msg) {
            app.throwTypeError(
                msg,
                app.ErrorType.Exception,
                code
            );
            // const data = {
            //   code,
            //   message: msg
            // };
            // this.ctx.body = data;
            // // 天网监控
            // this.ctx.twlogger.warn('fail', {
            //   subCategory: app.TWLoggerProps.SubCategory.ReqEnd
            // });
        }

    }

    class CustomService extends app.Service {
        /**
         * 获取当前登录的用户ID
         * @return {String}
         */
        get openId() {
            // authUser 取不到时改取 member
            return (
                this.ctx.authUser.openid || (this.member && this.member.cooperateUserId)
            );
        }

        get unionId() {
            // authUser 取不到时改取 member
            return (
                this.ctx.authUser.unionid || (this.member && this.member.unionId)
            );
        }

        /**
         * 获取当前平台类型（也代表机构号）
         *
         * @returns {String}
         */
        get termina() {
            return this.ctx.authUser.termina;
        }

        /**
         * 获取当前是否登录
         *
         * @returns {String}
         */
        get isLogin() {
            return this.ctx.authUser.islogin;
        }

        /**
         * 获取当前登录用户，未登录时返回 null
         *
         * @returns {Object}
         */
        get member() {
            return this.ctx.vars.member;
        }
    }

    app.ApiController = CustomController;
    app.ApiService = CustomService;

    class CustomError extends Error {
        /**
         * 自定义错误类
         * @param err [{Error}, {string}] 错误信息
         * @param type [{number}] 错误类型
         * @param code [{number}]
         * @param showMsg {string}
         * @param ext {any}
         */
        constructor(err, type, code, showMsg, ext) {
            if (typeof err === 'string') {
                super(err);
                this.stack = new Error(err).stack;
            } else {
                super(err.message);
                this.stack = err.stack;
            }

            this.name = this.constructor.name;
            this.status = code || 500;
            this.type = type || app.ErrorType.Exception;
            this.showMsg = showMsg;
            this.ext = ext;

            // if (typeof Error.captureStackTrace === 'function') {
            //   Error.captureStackTrace(this, this.constructor);
            // } else {
            //   this.stack = (new Error(message)).stack;
            // }
        }
    }

    app.Error = CustomError;


};