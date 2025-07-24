const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
    app.use(
        "/",
        createProxyMiddleware({
            target: process.env.SKILLS_URL,
            changeOrigin: true,
        })
    )

    app.use(
        "/api/students",
        createProxyMiddleware({
            target: process.env.STUDENTS_URL,
            changeOrigin: true,
        })
    )
}