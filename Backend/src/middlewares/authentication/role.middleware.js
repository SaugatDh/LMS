import prisma from "../../lib/dbConnection.js";
const isAuthenticated=(roles)=>{
  return (req,res,next)=>{
  const {role}=req.loggedInfo;
  if(!role) return res.status(401).json({statusCode:401,message:"please login to access this service !"});
    if(roles.includes(role)) next();
     return res.status(401).json({statusCode:401,message:"sorry! you are not authenticate to access this service !"});
 
  }
}
export {isAuthenticated};