const Router = require("koa-router");
const apiProxy = require("../model/index");

const router = new Router();

//登录
router
    .post("/login", async ctx => {
        //前端传过来的参数 ctx.request.body
        let data = await apiProxy.login(ctx.request.body);
        //获取请求后端返回的数据，传递给前端
        ctx.body = data;
    })

module.exports = router;
