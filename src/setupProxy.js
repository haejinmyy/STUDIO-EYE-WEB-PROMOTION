const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: "https://port-0-promoationpage-server-12fhqa2blnlum4de.sel5.cloudtype.app/",
    changeOrigin: true,
})
);
    app.use(
        createProxyMiddleware( '/user-service',{
            target: 'http://13.125.181.139:8000',
            changeOrigin: true
        })
    );

};