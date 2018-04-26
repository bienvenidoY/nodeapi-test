const request = require("../utils/request"); //封装响应拦截器
const orgRequest = require("request");
var WXBizDataCrypt = require("../decode/WXBizDataCrypt");

const APPID = 'wxbfe2c6898c6edd6a'//小程序后台复制
const SECRET = '83f2dc9cbb0ed5410cc961cfb10fc0b9' //小程序后台复制

module.exports = {
    //服务基础地址
    get baseUrl() {
        return "https://api.weixin.qq.com";
    },

    //获取session_key
    get sessionKey() {
        return async function({code = ''}) {
            let JSCODE = code//前端登录获取
            data = await request.get(this.baseUrl + `/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`);
            //data 中有session_key
            return data;
        };
    },
    get phoneNumber(){
      //解密换取信息
        return async function ({sessionKey = '',iv = '',encryptedData = ''}) {
            var pc = new WXBizDataCrypt(APPID, sessionKey);

            var data = pc.decryptData(encryptedData, iv);

            console.log("解密后 data: ", data);
            return data
        }
    },
    get accessToken(){
      return async function () {
        let data = await request.get(this.baseUrl + `/cgi-bin/token?appid=${APPID}&secret=${SECRET}&grant_type=client_credential`);

          return JSON.parse(data).access_token
      }
    },
    get qrcode(){

      return async function () {
          let accessToken = await this.accessToken()
          let options = {
              uri: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`,
              json: {
                  'page':'pages/details/main?title=navigate',
                  'scene':'title=navigate'
              }
          }
          let data = await orgRequest.post(options)
          return data
      }
    }

};
