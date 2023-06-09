import { Avatar, Button } from "@mui/material"
import { userDataType } from "./Home"
type Props = {
    userData : userDataType
}

export const ProfilePage = (props : Props) =>{
    const {userData} = props
    return(
        <div className="h-screen overflow-y-scroll">
            <div>
                <img src={userData.profilePicture} style={{minWidth:"100%" , minHeight : "300px" , maxHeight : "500px"}}></img>
            </div>
            <div className="flex justify-evenly">
            <div className="flex flex-col items-center">
                <div>Posts</div>
                <div>{userData.userPost.postContainer.length}</div>
            </div>
            <div className="flex flex-col items-center">
                <div>Following</div>
                <div>{userData.following.length}</div>
            </div>
            </div>
            <div className="flex w-full justify-center">
                <h1 style={{fontFamily : "'Montserrat', sans-serif" , fontSize : "30px"}}>{userData.fname} {userData.lname}</h1>
            </div>
            <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
            {userData.userPost.postContainer.length >= 1 ? userData.userPost.postContainer.map((posts : any)=>{
                return(
                    <>
                    { posts.image ?
                    <div className="drop-shadow-2xl bg-stone-50 flex flex-col max-w-638 max-h-667 " key={posts.username}>
                            <div className="drop-shadow-xl bg-stone-50 p-1 flex items-center">
                            <Avatar
                                alt="Remy Sharp"
                                src={userData.profilePicture}
                                sx={{ maxWidth: "100px", maxHeight: "69px" }}
                                />
                            <h1 style={{fontFamily : "'Montserrat', sans-serif" }}> {userData.username}</h1>
                            </div>
                            <div className="p-5">
                            <h2>{posts.caption}</h2>
                            </div>
                            <div>
                            <img src={posts.image} width={512} className="my-0 mx-auto max-h-400"></img>
                            </div>
                            </div>
                            : <h1>Notfound</h1> }
                        </>
                )
            }): null}
            </div>
        </div>
    )
}