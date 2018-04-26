const Router = require("koa-router");
const apiProxy = require("../model/index");

const router = new Router();
// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data
            })
            ctx.req.addListener("end",function(){
                let parseData = parseQueryStr( postdata )
                resolve( parseData )
            })
        } catch ( err ) {
            reject(err)
        }
    })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log( queryStrList )
    for (  let [ index, queryStr ] of queryStrList.entries()  ) {
        let itemList = queryStr.split('=')
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
    }
    return queryData
}


//搜索
router
    .get("/sessionKey", async ctx => {
        let data = await apiProxy.sessionKey(ctx.query);
        ctx.body = data;
    })
    .post('/phoneNumber', async ctx => {

        let data = await apiProxy.phoneNumber(ctx.request.body);
        ctx.body = data;
    })
    .get('/qrcode', async ctx => {
        let data = await apiProxy.qrcode(ctx.query);
        ctx.body = data;
    })

module.exports = router;
