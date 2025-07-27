const roleAccessMap = require("../config/roleAccess.config")
const { match } = require("path-to-regexp")

const dynamicRoleMiddleware = (req, res, next) => {
  const userRole = req.user?.role;

  if (!userRole) {
    return res.status(401).json({ message: "Unauthorized"})
  }

  const currentPath = req.baseUrl + req.path;
  let allowRoles = null;

  for(const routePattern in roleAccessMap ){
    const matcher = match(routePattern, { decode: decodeURIComponent })
    const matched = matcher(currentPath);

    if (matched) {
        allowRoles = roleAccessMap[routePattern]
        break;
    }
  }

  if (!allowRoles) {
    return res.status(403).json({ message: "Access denied - No rule for this route"})
  }

  if (!allowRoles.includes(userRole)) {
    return res.status(403).json({ message: "Access denied"})
  }

  next();
};

module.exports = dynamicRoleMiddleware
