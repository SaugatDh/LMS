class ResponseConfig{
constructor(
    status,
    message,
    data,
    isLoggedIn,
    isAuthonticate,
    success = true
    ){
    this.status = status;
    this.message = message;
    this.data = data;
    this.isLoggedIn = isLoggedIn;
    this.isAuthonticate = isAuthonticate;
    this.success = success;
}
}
export default ResponseConfig;