class ErrorConfig extends Error{
  constructor(status, message, success = false){
    super(message);
    this.status=status;
    this.success=success;
  }
}
export default ErrorConfig;