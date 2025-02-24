import { useEffect, useState } from "react";


import kep1 from "../../../public/kep1.png";
import kep2 from "../../../public/kep2.png";
import kep3 from "../../../public/kep3.png";
import kep4 from "../../../public/kep4.png";
import kep5 from "../../../public/kep5.png";


export function WelcomePage() {

    let [slideShowPicture,setSlideShowPicture] = useState(kep1)
    let [pictureCounter,setPictureCounter] = useState(1);

    useEffect(()=> {
        let pictureCounterIncreaser = setInterval(() =>{
            if (pictureCounter == 5) {
                setPictureCounter(1)
            }else{
                setPictureCounter((prevPictureCounter) => prevPictureCounter + 1)
            }
        },4000)

        switch (pictureCounter) {
            case 1:
                setSlideShowPicture(kep1)
                break;
            case 2:
                setSlideShowPicture(kep2)
                break;
            case 3:
                setSlideShowPicture(kep3)
            break;
            case 4:
                setSlideShowPicture(kep4)
            break;
            case 5:
                setSlideShowPicture(kep5)
            break;
            default:
                break;
        }

        return () => clearInterval(pictureCounterIncreaser)

    },[pictureCounter])

    return(
        <>
            {/*Header*/}
            <div className="p-5 bg-green-500 h-36 text-white flex justify-between">
                <div className="bg-black flex items-center w-fit h-fit p-9 cursor-pointer">Logo</div>
                <div className="flex items-center justify-around">
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Rólunk</div>
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Versenyek</div>
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Profil</div>
                </div>
            </div>

            {/*Slider*/}
            <div className="w-full h-[450px]">
                <div className="w-full h-full relative">
                    <img className="h-full w-full" src={slideShowPicture}/>
                    <div className="skibidi flex text-4xl stroke-2 w-24 justify-between absolute bottom-3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <button id="sliderBtn" className="rounded-full w-2 h-2 bg-gray-400 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" className="rounded-full w-2 h-2 bg-gray-400 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" className="rounded-full w-2 h-2 bg-gray-400 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" className="rounded-full w-2 h-2 bg-gray-400 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" className="rounded-full w-2 h-2 bg-gray-400 border-solid border-black border-[1px]"></button>
                    </div>
                </div>
            </div>
        </>
    )
}