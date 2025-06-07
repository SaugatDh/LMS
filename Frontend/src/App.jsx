import { use } from "react";
import { useSelector,useDispatch } from "react-redux";
import {login,logout} from "./slices/auth.slice.js";
import Button from "./components/Button.jsx";
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
  <Button btnColor="bg-red-500"btnFunction={()=>{dispatch(logout());}}>Logout</Button>
   </div>
   :<div className="flex gap-5">
      <h1 className="text-blue-900">Please login to continue.</h1>
     <Button btnColor="bg-blue-500"btnFunction={()=>{dispatch(login());}}>Login</Button>
      </div>
      }
    </div>
  )
}
export default App;