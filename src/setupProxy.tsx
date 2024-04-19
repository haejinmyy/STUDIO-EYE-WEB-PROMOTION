import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://3.35.54.100:8080/',
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware('/user-serivce', {
      target: 'http://43.203.217.95:8080/',
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware('/s3-bucket', {
      target: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/',
      changeOrigin: true,
    }),
  );
};
