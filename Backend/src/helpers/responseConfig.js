class ResponseConfig{
constructor(
    statusCode,
    message,
    data=null,
    success = true
    ){
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success;
}
}
export default ResponseConfig;