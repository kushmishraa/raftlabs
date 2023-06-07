import { Avatar } from "@mui/material";
import { useEffect , useState} from "react";

type userDataType = {
    authToken : string,
    fname : string,
    email : string,
    lname : string,
    number : string,
    post : object,
    userPost :object,
    profilePicture : string

}

export const PersonalComonent = () =>{
    const initData = {
        authToken : "",
        fname : "",
        email : "",
        lname : "",
        number : "",
        post : {},
        userPost :{},
        profilePicture : ""
    }
    const [userData  , setUserData] = useState<userDataType>(initData) ;

    const fetchUserData = async () =>
        {
            const res = await fetch('/home' , {method : "GET"});
            const data = await res.json();
            console.log(data)
            setUserData(data);
        }

    useEffect(()=>{
        fetchUserData() ; 
    },[])

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