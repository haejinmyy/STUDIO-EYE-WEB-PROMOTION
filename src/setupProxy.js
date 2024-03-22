const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://3.36.117.230:8080/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/user-service", {
      //   target: "http://13.125.181.139:8000",
      changeOrigin: true,
    })
  );
};
