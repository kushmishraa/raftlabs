import { useState , useEffect } from "react"
import { CreatePost, postDataType } from "./CreatePost"
import { userDataType } from "./Home"
import { Avatar, Button } from "@mui/material"
type Props={
    userData : userDataType 
}
export const Feed = (props : Props) =>{

    const {userData} = props;
    const [followedPost , setFollowedPost] = useState<Array<postDataType>>([])

    const profileFeed = (followedPost : Array<postDataType>) =>{
          userData?.userPost?.postContainer?.map((posts : any)=>{
            followedPost.push(posts)
        });
        followedPost.sort((a,b)=>{
            return new Date(b.date).valueOf() - new Date(a.date).valueOf()
        })
        setFollowedPost(followedPost);
    }

    const followerPosts =  () =>{
    let data : { post : Array<postDataType> , profilePicture : string} ;
     userData.following?.map(async (username)=>{
        console.log(username)
            const res = await fetch('/getFollowerPost',{
                method : "POST",
                headers : {
                    Accept : 'application/json',
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify({
                    "username" : username
                })
            })
            data = await res.json();
            console.log("data of" , username , "=>" , data)
            data.post.map((posts : postDataType)=>{
                posts = {...posts , profilePicture : data.profilePicture}
                // followedPost.push(posts)
                setFollowedPost([...followedPost , posts])
            })
        })
        profileFeed(followedPost)
    }
    
    // followerPosts();
   
    useEffect(()=>{
        followerPosts();
    },[userData])
    return(

        //feed container
        <div className="w-full h-full flex flex-col justify-center items-center overflow-y-scroll">
            {/* creating post */}
            <div className="w-full h-150">
                <CreatePost />
            </div>

            {/*user posts */}
            <div className="w-full min-h-1/2 drop-shadow-2xl flex flex-col items-center">
                {followedPost.length > 1 ? 
                    followedPost.map((posts)=>{
                        return(
                          <>
                            {posts.profilePicture ? 
                            <div className="drop-shadow-2xl bg-stone-50">
                            <Avatar
                                alt="Remy Sharp"
                                src={posts.profilePicture}
                                sx={{ width: "20%", height: "20%" }}
                                />
                            <div>
                            <h2>{posts.caption}</h2>
                            <img src={posts.image} width={"50%"} className="my-0 mx-auto"></img></div>
                            <Button variant="contained">like</Button>
                            <Button variant="outlined">Comment</Button>
                            </div> : null }
                         
                            </>
                        )
                    })
                    : null
                }
            </div>
        </div>
    )
}