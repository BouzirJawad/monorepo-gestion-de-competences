const express = require('express')
const cors = require('cors')
const briefRoutes = require("./routes/brief.routes")
const authRoutes = require("./routes/auth.routes")
const setUpProxies =  require("./routes/proxies")
require('dotenv').config()

const app = express()
app.use(cors())
app.use('/api/briefs', briefRoutes)
app.use('/api/auth', authRoutes)
setUpProxies(app);

const PORT = process.env.PORT || 7460

app.listen(PORT, () => {
    console.log(`API Gateaway running on port ${PORT}`)
})