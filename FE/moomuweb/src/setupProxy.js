const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // app.use(
  //   createProxyMiddleware("/api", {
  //     target: "http://k7b202.p.ssafy.io:8000",
  //     pathRewrite: {
  //       "^/api": "",
  //     },
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   createProxyMiddleware("/navermap", {
  //     target: "https://naveropenapi.apigw.ntruss.com",
  //     pathRewrite: {
  //       "^/navermap": "",
  //     },
  //     changeOrigin: true,
  //   })
  // );
};
