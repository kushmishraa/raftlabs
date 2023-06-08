import { Avatar } from "@mui/material";
import { useEffect , useState} from "react";
import { userDataType } from "./Home";
type Props={
    userData : userDataType 
}
export const PersonalComonent = (props : Props) =>{
const userData = props.userData;
    return(
        <div className="w-full h-screen">
            <div>
              <div>
                <h1>name : {userData ? userData.fname : "loading"}</h1>
                <Avatar src={userData ? userData.profilePicture : "none"} sx={{width : "40%",height: "40%"}}/>
              </div>
            </div>
        </div>
    )
}