
const asyncHandler=(fun)=>async (req,res,next)=>{
  try{
  await fun(req,res,next);
  }catch(error){
    console.log(JSON.stringify(error,null,2));
    next(error);
  }
}

export default asyncHandler;