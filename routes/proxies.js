const { createProxyMiddleware } = require("http-proxy-middleware");
const authMiddleware = require("../middleware/auth.middleware");
const dynamicRoleMiddleware = require("../middleware/role.middleware");

module.exports = (app) => {
  app.use(
    "/api/skills",
    authMiddleware,
    createProxyMiddleware({
      target: process.env.SKILLS_URL,
      changeOrigin: true,
      pathRewrite: { "^/": "/api/skills/" },
    })
  );

  app.use(
    "/api/briefs",
    authMiddleware,
    dynamicRoleMiddleware,
    createProxyMiddleware({
      target: process.env.BRIEFS_URL,
      changeOrigin: true,
      pathRewrite: { "^/": "/api/briefs/" },
    })
  );

  app.use(
    "/api/students",
    authMiddleware,
    dynamicRoleMiddleware,
    createProxyMiddleware({
      target: process.env.STUDENTS_URL,
      changeOrigin: true,
      pathRewrite: { "^/": "/api/students/" },
    })
  );

  app.use(
    "/api/users",
    authMiddleware,
    dynamicRoleMiddleware,
    createProxyMiddleware({
      target: process.env.AUTH_URL,
      changeOrigin: true,
      pathRewrite: {"^/": "/api/users/"}
    })
  );

  app.use(
    "/api/auth",
    createProxyMiddleware({
      target: "http://localhost:7464",
      changeOrigin: true,
      pathRewrite: { "^/": "api/auth/" }
    })
  );
};
