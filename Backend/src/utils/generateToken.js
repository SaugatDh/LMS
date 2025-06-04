import jwt from "jsonwebtoken";
const generateToken=(secretkey,tokenExpirationTime,payload)=>{
  let token=jwt.sign(payload,secretkey,{
    expiresIn:tokenExpirationTime
    });
  return token;
}
export default generateToken;