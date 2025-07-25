const express = require('express')
const router = express.Router()
const briefController = require('../controllers/brief.controller')
const authMiddleware = require("../middleware/auth.middleware")
const allowRoles = require("../middleware/role.middleware")

router.post('/create', authMiddleware, allowRoles('admin'), briefController.createBrief)
router.get('/:id', authMiddleware, briefController.getBrief)
router.get("/test", (req, res)=> {
    res.send("API gateaway working")
})

module.exports = router

