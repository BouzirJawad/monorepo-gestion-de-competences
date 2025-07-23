const axios = require("axios")

const register = async (req, res) => {
    try {
        const authRes = await axios.post(`${process.env.AUTH_URL}/register`, req.body)
        const { user } = authRes.data;

        if (user.role === "student") {
            await axios.post(`${process.env.STUDENTS_URL}/students/${user._id}/create`)
        }

        res.status(201).json({ message: "User registered successfully", user})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Failed to register user" })
    }
}

module.exports = { register }
