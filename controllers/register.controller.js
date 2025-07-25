const axios = require("axios")

const register = async (req, res) => {

    const { firstName, lastName, email, password, role } = req.body;
    try {
        const authRes = await axios.post(`${process.env.AUTH_URL}/api/auth/register`, {
            firstName,
            lastName,
            email,
            password,
            role
        })

        const user = authRes.data.user

        if (user.role === "student") {
            try {
                await axios.post(`${process.env.STUDENTS_URL}/api/students/student/${user._id}/create`)
            } catch (error) {
                console.error("Failed to create student:", error.response?.data || error.message)

                await axios.delete(`${process.env.AUTH_URL}/api/users/user/delete/${user._id}`)

                return res.status(500).json({
                    message: "User created but failed to create student profile. Rolled back.",
                    error: error.response?.data || error.message
                })
            }
        }

        return res.status(201).json({ message: "User registered successfully", user})
    } catch (error) {
        console.error("Auth registration error:", error.response?.data || error.message)

        return res.status(500).json(error.response?.data || error.message)
    }
}

module.exports = { register }
