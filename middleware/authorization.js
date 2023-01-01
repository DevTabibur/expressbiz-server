module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      return res.status(403).json({
        status: "failed", code:400,
        error: "Your'e not authorized to access this",
      });
    }
    next();
  };
};
