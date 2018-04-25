const Router = require("koa-router");
const apiProxy = require("../model/index");

const router = new Router();

//搜索
router
.get("/sessionKey", async ctx => {
    let data = await apiProxy.sessionKey(ctx.query);
    ctx.body = data;
})
    .get('/phoneNumber', async ctx=>{
        let data = await apiProxy.phoneNumber(ctx.query);
        ctx.body = data;
})

module.exports = router;
