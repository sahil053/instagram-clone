const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/oembed',
    createProxyMiddleware({
      target: 'https://api.instagram.com',
      changeOrigin: true,
      pathRewrite: {
        '^/oembed': '', // Remove the '/oembed' prefix from the path
      },
      headers: {
        // Add any additional headers required by the Instagram API
        // For example, if an API key is needed, you can include it here
        // 'Authorization': 'Bearer YOUR_API_KEY',
        Authorization : "AIzaSyBucH7Kzm8Ds5CbuUs8uQJlzTPh3eZcTzA",
        apiKey: "AIzaSyBucH7Kzm8Ds5CbuUs8uQJlzTPh3eZcTzA"
      },
    })
  );
};
