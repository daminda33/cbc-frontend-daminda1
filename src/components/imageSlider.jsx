import { useState } from "react"

export default function ImageSlider(props){
    const images = props.images;
    const [activeImageIndex, setActiveImageIndex]=useState(0)

    return(

        <div className="w-[300px] md:w-[400px] h-[500px] rounded-2xl">
            <img src={images[activeImageIndex]} className="w-full h-[400px] object-cover rounded-2xl border-2"/>

            <div className="w-full h-[100px] flex flex-row justify-center items-center gap-[2px]">
                {
                    images.map(
                        (image,index)=>{
                            
                            return(
                                <img src={image} key={index} className={"w-[90px] h-[90px] object-cover cursor-pointer"+(activeImageIndex == index && "border-amber-950 border-2 rounded-2xl")} 
                                onClick={
                                    ()=>{
                                        setActiveImageIndex(index)
                                    }
                                }/>
                            )
                        }
                    )
                }

            </div>

        </div>

    )
}