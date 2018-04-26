const Koa = require("koa"); //web frnamework
const chalk = require("chalk"); //打印字体漂亮
const routes = require("./routes");
const bodyParser = require("koa-bodyparser");
const config = require("../config/index.js"); //监听端口
const formidable = require('koa2-formidable')

const app = new Koa();

//app.use(formidable())
//bodyparser
app.use(bodyParser());

//自定义错误处理
app.use(async (ctx, next) => {
  try {
    await next();
    console.log(ctx.status);
    if (ctx.status === 404) {
      ctx.body = {
        msg: "404 未找到"
      };
      /*  await ctx.render("404", {
        
      }); */
    }
  } catch (err) {
    let status = err.status || 500;
    ctx.body = {
      msg: "服务器内部错误" + err.body || err.message
    };
    /* await ctx.render("500", {
      status,
      msg: "服务器内部错误" + err.body || err.message
    }); */
    console.log(err);
  }
});

// x-response-time
app.use(async function(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

//logger
app.use(async function(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

//路由
routes(app);

//异常
app.on("error", (err, ctx) => {
  console.log("error url:" + ctx.url);
  console.log("error detail:" + err);
  console.log("error stack:" + err.stack);
});

app.listen(config.port, () => {
  console.log(
    chalk.yellow(
      `Your application is running here: http://${config.host}:${config.port}`
    )
  );
});
