const errorHandler = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  res.status(err.statuscode).json({
    msg: err.message,
    stack: err.stack,
  });
};

module.exports = errorHandler;
