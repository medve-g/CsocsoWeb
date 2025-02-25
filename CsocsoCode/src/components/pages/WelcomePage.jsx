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
        let sliderButtons = document.querySelectorAll("#sliderBtn");
        switch (pictureCounter) {
            case 1:
                setSlideShowPicture(kep1)
                sliderButtons[0].classList.add("bg-white")
                sliderButtons[4].classList.remove("bg-white")
                break;
            case 2:
                setSlideShowPicture(kep2)
                sliderButtons[1].classList.add("bg-white")
                sliderButtons[0].classList.remove("bg-white")
                break;
            case 3:
                setSlideShowPicture(kep3)
                sliderButtons[2].classList.add("bg-white")
                sliderButtons[1].classList.remove("bg-white")
            break;
            case 4:
                setSlideShowPicture(kep4)
                sliderButtons[3].classList.add("bg-white")
                sliderButtons[2].classList.remove("bg-white")
            break;
            case 5:
                setSlideShowPicture(kep5)
                sliderButtons[4].classList.add("bg-white")
                sliderButtons[3].classList.remove("bg-white")
            break;
            default:
                setSlideShowPicture(kep1)
                sliderButtons[0].classList.add("bg-white")
                sliderButtons[4].classList.remove("bg-white")
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

            {/*About*/}
            <section className="bg-green-100 py-16 px-6 md:px-12 lg:px-24 text-green-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-green-700 mb-6">Rólunk</h2>
                    <p className="text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium reprehenderit doloribus illum dolorum, iusto atque reiciendis doloremque error facilis veniam sed id. Fugiat, odit cupiditate ex mollitia aliquid veritatis excepturi!
                    </p>
                </div>
                <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg w-80 text-center hover:brightness-125 transition duration-300">
                        <h3 className="text-2xl font-semibold">Egyesületünk neve:</h3>
                        <p className="mt-3 text-green-200">
                            Viharsarki Csocsó Egyesület
                        </p>
                    </div>
                    <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg w-80 text-center hover:brightness-125 transition duration-300">
                        <h3 className="text-2xl font-semibold">Alapító tagok</h3>
                        <p className="mt-3 text-green-200">
                            Földi Zsolt
                        </p>
                    </div>
                    <div className="bg-green-400 text-white p-6 rounded-2xl shadow-lg w-80 text-center hover:brightness-125 transition duration-300">
                        <h3 className="text-2xl font-semibold">Alapításának éve</h3>
                        <p className="mt-3 text-green-200">
                            nemtudom
                        </p>
                    </div>
                </div>
            </section>
            skibidi
        </>
    )
}