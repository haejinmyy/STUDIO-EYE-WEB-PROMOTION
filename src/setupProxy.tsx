import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
  app.use(
    createProxyMiddleware('/promotion', {
      target: 'http://3.36.95.109:8080',
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware('/user', {
      target: 'http://13.125.37.8:8080',
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware('/s3-bucket', {
      target: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com',
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware('/dd', {
      target: 'http://43.201.98.4:8000',
      changeOrigin: true,
    }),
  );
};
