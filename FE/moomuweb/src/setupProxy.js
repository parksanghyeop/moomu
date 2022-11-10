// const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/map-direction-15/v1",
    createProxyMiddleware({
      target: "https://naveropenapi.apigw.ntruss.com",
      secure: false,
      changeOrigin: true,
    })
  );
};
