const express = require("express");
const router = express.Router();
const axios = require("axios")

router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params
    try {
        const userRes = await axios.get(`${process.env.AUTH_URL}/api/users/user/${userId}`)
        const user = userRes.data

        return res.status(201).json(user)
    } catch (error) {
        console.error("Error fetching User:", error.response?.data || error.message)
        return res.status(500).json({
            message: "Error fatching user data from micro service",
            error: error.response?.data || error.message
        })
    }
})

router.delete("/user/delete/:userId", async (req, res) => {
    const { userId } = req.params
    try {
        const userRes = await axios.delete(`${process.env.AUTH_URL}/api/users/user/delete/${userId}`)
        return res.status(userRes.status).json(userRes.data)
    } catch (error) {
        console.error("Error deleting User:", error.response?.data || error.message)
        return res.status(500).json({
            message: "Error deleting user data from micro service",
            error: error.response?.data || error.message
        })
    }
})

module.exports = router;
