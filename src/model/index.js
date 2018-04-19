const request = require("../utils/request"); //封装响应拦截器
const orgRequest = require("request");

module.exports = {
  //服务基础地址
  get baseUrl() {
    return "http://tingapi.ting.baidu.com/v1/restserver/ting";
  },

  //搜索
  get search() {
    return async function(keyWords) {
      let name = decodeURI(keyWords),
        url =
          "?format=json&version=2&from=0&method=baidu.ting.search.catalogSug&query=" +
          encodeURI(name),
        data = await request.get(this.baseUrl + "?" + url);
      return data;
    };
  },

  //歌曲详情
  get songDetail() {
    return async function(id) {
      let url = this.baseUrl + "?method=baidu.ting.song.play&songid=" + id,
        data = await request.get(url);
      return data;
    };
  },

  //歌曲流
  get mediaStream() {
    return function(fileLink) {
      let options = {
        url: fileLink,
        headers: {
          "Content-Type": "application/octet-stream"
        }
      };
      return orgRequest(options);
    };
  },

  //艺人信息
  get artistInfo() {
    return async function(uid) {
      let url =
          this.baseUrl + "?method=baidu.ting.artist.getInfo&tinguid=" + uid,
        data = await request.get(url);
      return data;
    };
  },

  //歌词
  get lry() {
    return async function(id) {
      let url = this.baseUrl + "?method=baidu.ting.song.lry&songid=" + id,
        data = await request.get(url);
      return data;
    };
  },
  get getAll() {
    return async function(baseUrl = this.baseUrl, query) {
      console.log("baseUrl:" + (baseUrl || this.baseUrl));
      console.log("query:" + query);
      console.log(
        "fullUrl:" + encodeURI(`${baseUrl || this.baseUrl}?${query}`)
      );
      let fullUrl = encodeURI(baseUrl || this.baseUrl + "?" + query),
        data = await request.get(fullUrl);
      return data;
    };
  }
};
