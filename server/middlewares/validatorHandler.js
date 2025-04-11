const { validationResult } = require("express-validator");
const fs = require("node:fs");

const validatorHandler = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    if (req.files && req.files.length) {
      for (const image of req.files) {
        fs.unlinkSync(image.path);
      }
    }
    return res.status(400).json({ msg: result.array()[0].msg });
  }
  next();
};

module.exports = validatorHandler;
