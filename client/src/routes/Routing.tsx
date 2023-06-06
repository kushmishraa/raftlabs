import { Routes , Route } from "react-router-dom";
import { Login } from "../component/Login";
import { Signup } from "../component/Signup";

export const Routing = () =>{
  return(  
  <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path = "*" element={<h1>404 not found</h1>} />
    </Routes>
  )
}