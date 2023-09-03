const { createProxyMiddleware } = require("http-proxy-middleware");
require('dotenv').config();
 
const apiProxy = createProxyMiddleware({
  target: process.env.TARGET,
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // strip "/api" from the URL
  },
  onProxyRes(proxyRes) {
    proxyRes.headers["access-control-allow-origin"] = "*", 
    proxyRes.headers["access-control-allow-methods"] = "DELETE, POST, GET, OPTIONS, PUT, PATCH",
    proxyRes.headers["access-control-allow-headers"] = "Origin, X-Requested-With, Content-Type, Accept" 
  },
});
 
// Expose the proxy on the "/api/*" endpoint.
export default function (req, res) {
  return apiProxy(req, res);
}