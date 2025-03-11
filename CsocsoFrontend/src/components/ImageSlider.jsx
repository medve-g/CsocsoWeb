import kep1 from "../../public/kep1.jpg";
import kep2 from "../../public/kep2.jpg";
import kep3 from "../../public/kep3.jpg";
import kep4 from "../../public/kep4.jpg";
import kep5 from "../../public/kep5.jpg";

import { useEffect, useState } from "react";

function ImageSlider(){

    let [slideShowPicture, setSlideShowPicture] = useState(kep1);
    let [pictureCounter, setPictureCounter] = useState(1);

    let chooseSliderPicture = (event) => {
        let numberOfSliderBtn = event.target.value
        if (pictureCounter < numberOfSliderBtn) {
            let calculatedSliderNumber = numberOfSliderBtn - pictureCounter;
            setPictureCounter((preValue) => preValue + calculatedSliderNumber)
        } else if (pictureCounter > numberOfSliderBtn) {
            let calculatedSliderNumber = pictureCounter - numberOfSliderBtn
            setPictureCounter((preValue) => preValue - calculatedSliderNumber)
        }
    }

    useEffect(() => {
        let sliderButtons = document.querySelectorAll("#sliderBtn");
        switch (pictureCounter) {
            case 1:
                setSlideShowPicture(kep1)
                for (let i = 0; i < sliderButtons.length; i++) {
                    sliderButtons[i].classList.remove("bg-white")
                    sliderButtons[i].classList.add("bg-gray-400")
                }
                sliderButtons[0].classList.remove("bg-gray-400")
                sliderButtons[0].classList.add("bg-white")
                break;
            case 2:
                setSlideShowPicture(kep2)
                for (let i = 0; i < sliderButtons.length; i++) {
                    sliderButtons[i].classList.remove("bg-white")
                    sliderButtons[i].classList.add("bg-gray-400")
                }
                sliderButtons[1].classList.remove("bg-gray-400")
                sliderButtons[1].classList.add("bg-white")
                break;
            case 3:
                setSlideShowPicture(kep3)
                for (let i = 0; i < sliderButtons.length; i++) {
                    sliderButtons[i].classList.remove("bg-white")
                    sliderButtons[i].classList.add("bg-gray-400")
                }
                sliderButtons[2].classList.remove("bg-gray-400")
                sliderButtons[2].classList.add("bg-white")
                break;
            case 4:
                setSlideShowPicture(kep4)
                for (let i = 0; i < sliderButtons.length; i++) {
                    sliderButtons[i].classList.remove("bg-white")
                    sliderButtons[i].classList.add("bg-gray-400")
                }
                sliderButtons[3].classList.remove("bg-gray-400")
                sliderButtons[3].classList.add("bg-white")
                break;
            case 5:
                setSlideShowPicture(kep5)
                for (let i = 0; i < sliderButtons.length; i++) {
                    sliderButtons[i].classList.remove("bg-white")
                    sliderButtons[i].classList.add("bg-gray-400")
                }
                sliderButtons[4].classList.remove("bg-gray-400")
                sliderButtons[4].classList.add("bg-white")
                break;
            default:
                setSlideShowPicture(kep1)
                for (let i = 0; i < sliderButtons.length; i++) {
                    sliderButtons[i].classList.remove("bg-white")
                    sliderButtons[i].classList.add("bg-gray-400")
                }
                sliderButtons[0].classList.remove("bg-gray-400")
                sliderButtons[0].classList.add("bg-white")
                break;
        }

        let pictureCounterIncreaser = setInterval(() => {
            if (pictureCounter == 5) {
                setPictureCounter(1)
            } else {
                setPictureCounter((prevPictureCounter) => prevPictureCounter + 1)
            }
        }, 7000)



        return () => clearInterval(pictureCounterIncreaser)

    }, [pictureCounter])

    return(
        <div className="w-full h-[500px]">
                <div className="w-full h-full relative">
                    <img className="h-full w-full" src={slideShowPicture} />
                    <div className="flex text-4xl stroke-2 w-24 justify-between absolute bottom-3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <button id="sliderBtn" value={1} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" value={2} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" value={3} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" value={4} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 border-solid border-black border-[1px]"></button>
                        <button id="sliderBtn" value={5} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 border-solid border-black border-[1px]"></button>
                    </div>
                </div>
            </div>
    )

}

export default ImageSlider