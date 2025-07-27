const express = require('express')
const router = express.Router()
const parser = express.json()
const briefController = require('../controllers/brief.controller')
const authMiddleware = require("../middleware/auth.middleware")
const dynamicRoleMiddleware = require("../middleware/role.middleware")

router.post('/create',parser, authMiddleware, dynamicRoleMiddleware, briefController.createBrief)
router.get('/brief/:briefId',parser, authMiddleware, briefController.getBrief)
router.get("/test", (req, res)=> {
    res.send("API gateaway working")
})

module.exports = router
