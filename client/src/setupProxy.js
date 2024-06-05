const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
      headers: {
        "Connection": "keep-alive",
      },
      followRedirects: true,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true
    })
  );
};
console.log(`${process.env.REACT_APP_GRAPHQL_ENDPOINT}`);
console.log(process.env.REACT_APP_GRAPHQL_ENDPOINT);
console.log(process.env.MONGODB_URI);