const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://news-at.zhihu.com/api/4',
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
