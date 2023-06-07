import React from "react"

export const Upload = () =>{

    const handleFormSubmit = async (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(e.currentTarget.image.files)
        const formData = new FormData();
        const file = e.currentTarget.image.files[0];
        formData.append('image' , file)
  
        try{
            const res = await fetch('/upload' , {
                method : "post",
                body : formData
            })
            const data = await res.json();
            console.log(data);
        
        }catch(err){
            console.log(err);
        }
        }

    return(
        <>
            <form onSubmit={handleFormSubmit}>
                <input type="file" name="image"/>
                <button type="submit">submit</button>
            </form>
        </>
    )

}