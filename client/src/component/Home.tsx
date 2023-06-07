import { PersonalComonent } from "./PersonalComponent"

export const Home = () =>{

    return(
        <div className="flex flex-row  bg-slate-200 w-full  h-screen items-center justify-between">
           
            <div className="bg-white h-full w-[20%] drop-shadow-xl">
                <PersonalComonent />
            </div>

            <div className="bg-white h-full w-[50%] drop-shadow-2xl">

            </div>

            <div className="bg-white h-full w-[20%] drop-shadow-xl">

            </div>

        </div>  
        
    )

}