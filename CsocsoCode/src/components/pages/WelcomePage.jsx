import { useEffect, useState } from "react";


import kep1 from "../../../public/kep1.png";
import kep2 from "../../../public/kep2.png";
import kep3 from "../../../public/kep3.png";
import kep4 from "../../../public/kep4.png";
import kep5 from "../../../public/kep5.png";
import logo from "../../../public/logo.png";


export function WelcomePage() {

    let [slideShowPicture,setSlideShowPicture] = useState(kep1);
    let [pictureCounter,setPictureCounter] = useState(1);


    let chooseSliderPicture = (event) =>{
        let numberOfSliderBtn = event.target.value
        if (pictureCounter < numberOfSliderBtn) {
            let calculatedSliderNumber = numberOfSliderBtn - pictureCounter;
            setPictureCounter((preValue) => preValue + calculatedSliderNumber)
        }else if (pictureCounter > numberOfSliderBtn) {
            let calculatedSliderNumber = pictureCounter - numberOfSliderBtn
            setPictureCounter((preValue) => preValue - calculatedSliderNumber)
        }
    }

    useEffect(()=> {
        let asdasd = document.querySelectorAll("#sliderBtn");
        switch (pictureCounter) {
            case 1:
                setSlideShowPicture(kep1)
                asdasd[0].classList.add("bg-white")
                asdasd[4].classList.remove("bg-white")
                break;
            case 2:
                setSlideShowPicture(kep2)
                asdasd[1].classList.add("bg-white")
                asdasd[0].classList.remove("bg-white")
                break;
            case 3:
                setSlideShowPicture(kep3)
                asdasd[2].classList.add("bg-white")
                asdasd[1].classList.remove("bg-white")
            break;
            case 4:
                setSlideShowPicture(kep4)
                asdasd[3].classList.add("bg-white")
                asdasd[2].classList.remove("bg-white")
            break;
            case 5:
                setSlideShowPicture(kep5)
                asdasd[4].classList.add("bg-white")
                asdasd[3].classList.remove("bg-white")
            break;
            default:
                setSlideShowPicture(kep1)
                asdasd[0].classList.add("bg-white")
                asdasd[4].classList.remove("bg-white")
            break;
        }

        let pictureCounterIncreaser = setInterval(() =>{
            if (pictureCounter == 5) {
                setPictureCounter(1)
            }else{
                setPictureCounter((prevPictureCounter) => prevPictureCounter + 1)
            }
        },2000)

        

        return () => clearInterval(pictureCounterIncreaser)

    },[pictureCounter])

    return(
        <>
            {/*Header*/}
            <div className="p-5 bg-[#5fbe20] h-32 text-white flex justify-between">
                <div className="inline-block cursor-pointer"><img className="h-full" src={logo} alt="CsocsoLogo" /></div>
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
                        <button id="sliderBtn" value={1} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 bg-gray-400 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" value={2} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 bg-gray-400 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" value={3} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 bg-gray-400 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" value={4} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 bg-gray-400 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" value={5} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 bg-gray-400 border-solid border-black border-[1px]"></button>
                    </div>
                </div>
            </div>
        </>
    )
}