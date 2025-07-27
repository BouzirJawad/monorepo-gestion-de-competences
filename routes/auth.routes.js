const express = require("express");
const router = express.Router();
const parser = express.json()
const { register } = require("../controllers/register.controller");

router.post("/register", parser, register);

module.exports = router;
