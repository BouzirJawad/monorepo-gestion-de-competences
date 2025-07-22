const express = require('express')
const router = express.Router()
const briefController = require('../controllers/brief.controller')

router.post('/create', briefController.createBrief)
router.get('/:id', briefController.getBrief)
router.get("/test", (req, res)=> {
    res.send("API gateaway working")
})

module.exports = router

