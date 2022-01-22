const { APIError, ParameterError } = require('./utils/errors');
const request = require('request');
const EventEmitter = require('events');
/*!
 * callapi
 * Copyright(c) 2022 Zozick
 * MIT Licensed
 */

'use strict'

module.exports = class callapi {
    /**
     * @param {Object} options - Опции 
     * @param {String} options.token - API ключ
     * @param {String} options.key - Ключ для подтверждения сервера
     * @param {Number} options.userId - ID пользователя
     */
    constructor(options) {
        if (!options.token) options.token = null;

        if (!options.key) throw new ParameterError('key');
        if (!options.token) throw new ParameterError('token');
        if (!options.userId) throw new ParameterError('id');
        if (!Number(options.userId)) throw new TypeError('ID must be a number');
        request('https://vk.com/id' + options.userId, function (error, response, body) {
            if (response.statusCode == 404) throw new Error("The user with this ID was not found")
        });
//        request.post({ url: 'https://api.vk.com/', form: { key: 'value' } }, function (err, httpResponse, body) {
//            if (err) {
//                throw new Error('An error has occurred, our server is turned off or is in those works');
//            }
//            throw new Error('Upload successful!  Server responded with:', body);
//        })
        this.userId = options.userId;
        this.token = options.token;

        this.api = new API(this.key, this.userId);
//        this.updates = new Updates(this.token, this.userId);

    }
};
class API {
    /**
     * @param {Number} token - API ключ
     * @param {String} userId - ID пользователя
     */
    constructor(token, userId) {
        this.token = token;
        this.userId = userId;
    }

    /**
     * @param {String} method - Метод
     * @param {Object} params - Параметры метода
     */
    async call(method, params) {
        if (!method) {
            throw new ParameterError('method');
        }

        if (!params) {
            throw new ParameterError('params');
        }

    }
}