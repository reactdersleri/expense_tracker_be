module.exports = function catchAllErrorHandler(err, req, res, next) {
  const statusCode = err[0];
  const errorMessage = err[1];
  return res.status(statusCode).send({ errorMessage });
};
