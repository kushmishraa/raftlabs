import { Avatar, Button } from "@mui/material";
import { useEffect , useState} from "react";
import { userDataType } from "./Home";
type Props={
    userData : userDataType ,
    setHomeview : Function
}
export const PersonalComonent = (props : Props) =>{
const userData = props.userData;
const setHomeView = props.setHomeview;
    return(
        <div className="w-full h-screen flex flex-col justify-center">
            <div>
              <div>
                <img src={userData.profilePicture} />
              </div>
              <div>
                <Button variant = "outlined" sx={{width : "100%"}} onClick={()=>setHomeView("profile")}>Profile</Button>
              </div>
            </div>
        </div>
    )
}