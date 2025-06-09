
const isAuthenticated=(roles)=>{
  return (req,res,next)=>{
  const {role}=req.loggedInfo;
  console.log({role});
  if(!role) return res.status(401).json({statusCode:401,message:"please login to access this service !"});
    if(roles.includes(role)) {
      console.log("user is authenticated");
      return next();
    }
     return res.status(401).json({statusCode:401,message:"sorry! you are not authenticate to access this service !"});
 
  }
}
export {isAuthenticated};