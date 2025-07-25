const allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(403).json({ message: "No user data found" })
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied"})
        }

        next()
    }
}

module.exports = allowRoles