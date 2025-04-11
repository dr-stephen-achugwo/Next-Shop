const jwt = require("jsonwebtoken");

const verifyAndRefreshToken = (req, res, next) => {
  const accessToken = req.cookies.at;
  const refreshToken = req.cookies.rt;
  if (accessToken) {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    if (!decoded) return res.status(401).json({ msg: "invalid token" });
    req.user = decoded;
    next();
  } else {
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
      if (!decoded) return res.status(401).json({ msg: "invalid token" });
      const accessToken = jwt.sign(
        { _id: decoded._id, role: decoded.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.cookie("at", accessToken, { maxAge: 60 * 60 * 1000 });
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({ msg: "unauthorized, please login again!" });
    }
  }
};

const verifyTokenWithAdmin = (req, res, next) => {
  verifyAndRefreshToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "access denied" });
    }
    next();
  });
};

const verifyTokenWithUser = (req, res, next) => {
  verifyAndRefreshToken(req, res, () => {
    if (req.user.role !== "user") {
      return res.status(403).json({ msg: "access denied" });
    }
    next();
  });
};

const verifyAuthorization = (req, res, next) => {
  verifyAndRefreshToken(req, res, () => {
    if (req.user.role === "admin" || req.params.id === req.user._id) {
      next();
    } else {
      return res.status(403).json({ msg: "access denied" });
    }
  });
};

module.exports = {
  verifyAndRefreshToken,
  verifyTokenWithAdmin,
  verifyTokenWithUser,
  verifyAuthorization,
};
