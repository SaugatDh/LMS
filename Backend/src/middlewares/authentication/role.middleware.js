import {User} from "../../entities/user.entity";
import ErrorConfig from "../../helpers/errorConfig";
const isAuthenticated=(roles)=>{
  return async(req,_,next)=>{
    try{
    let userExist=await User.findOne({where:{email:req.email}});
    if(!userExist) throw new ErrorConfig(401,"sorry! you are not authonticate to access this service !!");
    const {role}=userExist;
    if(roles.includes(role)) next();
     throw new ErrorConfig(401,"sorry! you are not authonticate to access this service !!");
  }catch(error){
    throw new Error();
  }
  }
}
export {isAuthenticated};