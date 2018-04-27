const Router = require("koa-router");
const apiProxy = require("../model/index");

const router = new Router();

//搜索
router
  .get("/sessionKey", async ctx => {
    let data = await apiProxy.sessionKey(ctx.query);
    ctx.body = data;
  })
  .post("/phoneNumber", async ctx => {
    let data = await apiProxy.phoneNumber(ctx.request.body);
    ctx.body = data;
  })
  .get("/qrcode", async ctx => {
    let data = await apiProxy.qrcode(ctx.query);
    ctx.body = data;
  });

module.exports = router;
