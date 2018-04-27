const Router = require("koa-router");
const apiProxy = require("../model/index");

const router = new Router();

//搜索
router
    .post("/login", async ctx => {
        let data = await apiProxy.login(ctx.request.body);
        ctx.body = data;
    })

module.exports = router;
