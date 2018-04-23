const request = require("../utils/request"); //封装响应拦截器
const orgRequest = require("request");

module.exports = {
    //服务基础地址
    get baseUrl() {
        return "http://139.196.195.59:8104";
    },
    //登录
    get login() {
        return async function (option) {

            let url = this.baseUrl + '/session',
             data = await request.post({
                url,
                data:option
            });
            console.log(data)
            return data
        };
    },


};