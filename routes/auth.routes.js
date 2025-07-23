const express = require("express");
const router = express.Router();
const axios = require("axios")
const { register } = require("../controllers/register.controller");

router.post("/register", register);
router.post("/login", async (req, res) => {
  try {
    const resp = await axios.post(`${process.env.AUTH_URL}/api/auth/login`, req.body)
    res.status(resp.status).json(resp.data)
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth service unavailable" });
  }
});

module.exports = router;
