const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err);
  let statusCode = err.statusCode;
  let message=err.message;
  let success=err.success;
  res.status(statusCode).json({statusCode,message,success});
}
export default errorHandler;