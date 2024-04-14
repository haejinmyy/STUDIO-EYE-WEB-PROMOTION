import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://3.35.54.100:8080',
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware('/user-serivce', {
      target: 'http://43.201.95.252:8000',
      changeOrigin: true,
    }),
  );
};
