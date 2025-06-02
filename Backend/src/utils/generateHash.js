import bcrypt from "bcryptjs";
const hashedData=async(password,salt=10)=>{
  const hashedData=await bcrypt.hash(password,salt);
  return hashedData;
}
export default hashedData;