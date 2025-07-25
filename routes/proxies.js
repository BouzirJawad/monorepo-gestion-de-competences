const { createProxyMiddleware } = require("http-proxy-middleware")
const authMiddleware = require("../middleware/auth.middleware")
const allowRoles = require("../middleware/role.middleware")

module.exports = (app) => {
    app.use(
        "/",
        authMiddleware,
        allowRoles('admin'),
        createProxyMiddleware({
            target: process.env.SKILLS_URL,
            changeOrigin: true,
        })
    )

    app.use(
        "/api/students",
        authMiddleware, 
        createProxyMiddleware({
            target: process.env.STUDENTS_URL,
            changeOrigin: true,
        })
    )
}