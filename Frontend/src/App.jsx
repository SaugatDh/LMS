import { use } from "react";
import { useSelector,useDispatch } from "react-redux";
import {login,logout} from "./slices/auth.slice.js";
const App=()=>{
  const {isAuthenticated}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  console.log(isAuthenticated);
  return(
    <div className="mt-5 ml-5">
   {
   isAuthenticated ? 
    <div className="flex gap-5">
   <h1 className="text-red-900">Welcome to  react js.</h1>
   <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={()=>{dispatch(logout())}}>Logout</button>
   </div>
   :<div className="flex gap-5">
      <h1 className="text-blue-900">Please login to continue.</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>{dispatch(login())}}>Login</button>
      </div>
      }
    </div>
  )
}
export default App;