import { Button, Input, MenuItem, OutlinedInput, Select, TextareaAutosize, Theme, useTheme } from "@mui/material"
import React, { useRef, useState } from "react"
import { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
export type postDataType = {
    caption : string,
    image : string,
    tagged : Array<string>,
    comments : {
      from:string,
      comment : string
    }[],
    like : {
      user : string
    }[],
    date : Date,
    profilePicture : string
}

export const CreatePost = () =>{
    const [post , setPost] = useState<postDataType>({
        caption : "",
        image : "",
        tagged : [],
        comments : [{from:"",comment:""}],
        like : [{user:""}],
        date : new Date(),
        profilePicture : ""
    });

    const theme = useTheme();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

      function getStyles(name: string, tagged: readonly string[], theme: Theme) {
        return {
          fontWeight:
            post.tagged.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }

    const names = ["kush" , "kushagra" , "shubh" , "shubham"];

    const handleTagged = (event: SelectChangeEvent<string[]>) => {
        const {
          target: { value },
        } = event;
       console.log(value)
       console.log(value.toString())
       setPost(
        {
            ...post,
            tagged : typeof value === 'string' ? value.split(',') : value,
        }

       )
      };

    const handleCaption = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        console.log(event.currentTarget.value)
        setPost({
            ...post,
            caption : event.currentTarget.value
        })
    }

    const addPost = async (userData : {caption : string,
    image : any,
    tagged : string }) =>{
    
        const {caption , image , tagged} = userData
        
        const formData = new FormData(); 
        const date = new Date().toString();
        formData.append('image',image);
        formData.append('caption',caption)
        formData.append('tagged',tagged)
        formData.append('date',date)
        

        const res = await fetch('/upload' , {
            method : "POST",
            body : formData

        })
        const data = await res.json()
        console.log(data)
    }

    const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(e.currentTarget.caption.value)
        console.log(e.currentTarget.image.value)
        console.log(e.currentTarget.tagged.value)
        const userData = {
            caption : e.currentTarget.caption.value,
            image : e.currentTarget.image.files[0],
            tagged : e.currentTarget.tagged.value
        }
        addPost(userData);
    }

    return (
        //post box container
        <div className="w-full h-full flex flex-col justify-center items-center bg-stone-50 my-5">
        <form onSubmit={handleFormSubmit} className="flex flex-col w-full justify-center items-center gap-5">
        <TextareaAutosize minRows={5} placeholder="create a post"
         style={{
            width : "90%",
            padding : "2%"
         }}
         onChange={handleCaption}
         name="caption" />
         <div className="flex">
         <Input type="file" name="image"/>
         <Select
          multiple
          displayEmpty
          value={post.tagged}
          onChange={handleTagged}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          name="tagged"
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, post.tagged, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
         <Button variant="outlined" type="submit">Post</Button>
         </div>
         </form>
        </div>
    )
}