import { Feed } from "./Feed"
import { useEffect , useState} from 'react'
import { PersonalComonent } from "./PersonalComponent"
import { FindPeople } from "./FindPeople"


export type userDataType = {
    authToken : string,
    fname : string,
    username : String,
    email : string,
    lname : string,
    number : string,
    post : object,
    userPost :{
        postContainer : Array<object>
    },
    profilePicture : string,
    following : Array<string>
}

export const Home = () =>{
    const initData = {
        authToken : "",
        fname : "",
        email : "",
        username : "",
        lname : "",
        number : "",
        post : {},
        userPost :{
            postContainer : [{}]
        },
        profilePicture : "",
        following : [""]
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
        <div className="flex flex-row  bg-slate-200 w-full  h-screen items-center justify-between">
           
            <div className="bg-white h-full w-[20%] drop-shadow-xl">
                <PersonalComonent userData={userData}/>
            </div>

            <div className="bg-white h-full w-[50%] drop-shadow-2xl">
                <Feed userData={userData}/>
            </div>

            <div className="bg-white h-full w-[20%] drop-shadow-xl">
                <FindPeople userData = {userData}/>
            </div>

        </div>  
        
    )

}