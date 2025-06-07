class ResponseConfig{
constructor(
    status,
    message,
    data,
    success = true
    ){
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = success;
}
}
export default ResponseConfig;