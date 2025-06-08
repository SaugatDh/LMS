import crypto from "crypto";
const generateOtp=()=>{
  let otp=crypto.randomInt(100000,999999).toString();
  return otp;
}
export default generateOtp;