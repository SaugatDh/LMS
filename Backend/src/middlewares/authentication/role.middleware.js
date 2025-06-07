
import ErrorConfig from "../../helpers/errorConfig.js";
const isAuthenticated=(roles)=>{
  return async(req,res,next)=>{
    try{
    let userExist=await User.findOne({where:{email:req.email}});
    if(!userExist)  return res.status(401).json({statusCode:401,message:"sorry! you are not authenticate to access this service !"});
    const {role}=userExist;
    if(roles.includes(role)) next();
     return res.status(401).json({statusCode:401,message:"sorry! you are not authenticate to access this service !"});
  }catch(error){
    return res.status(500).json({statusCode:500,message:"Internal server error !"})
  }
  }
}
export {isAuthenticated};