import kep1 from "../../public/kep1.jpg";
import kep2 from "../../public/kep2.jpg";
import kep3 from "../../public/kep3.jpg";
import kep4 from "../../public/kep4.jpg";
import kep5 from "../../public/kep5.jpg";

import { useEffect, useState } from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ImageSlider() {

    let [previousSlideshowPicture, setPreviousSlideshowPicture] = useState(kep5)
    let [currentSlideshowPicture, setCurrentSlideshowPicture] = useState(kep1);
    let [nextSlideshowPicture, setNextSlideshowPicture] = useState(kep2)
    let [pictureCounter, setPictureCounter] = useState(1);

    function swipeRight(paramPreviousSlideshowPicture, paramCurrentSlideshowPicture, paramNextSlideshowPicture) {
        let collectImagePlaceholders = [document.getElementById("prevPic"), document.getElementById("currPic"), document.getElementById("nextPic")]

        collectImagePlaceholders[2].classList.add("duration-500")
        collectImagePlaceholders[1].classList.add("duration-500")
        collectImagePlaceholders[1].classList.add("-translate-x-full")
        collectImagePlaceholders[2].classList.add("-translate-x-full")
        setTimeout(() => {
            setPreviousSlideshowPicture(paramPreviousSlideshowPicture)
            setCurrentSlideshowPicture(paramCurrentSlideshowPicture)
            setNextSlideshowPicture(paramNextSlideshowPicture)
            collectImagePlaceholders[2].classList.remove("duration-500")
            collectImagePlaceholders[1].classList.remove("duration-500")
            collectImagePlaceholders[2].classList.remove("-translate-x-full")
            collectImagePlaceholders[1].classList.remove("-translate-x-full")
        }, 600)

    }

    function selectNextSliderPicture(){
        
    }

    function swipeLeft() {
        if (pictureCounter == 1) {
            setPictureCounter(5)
        } else {
            setPictureCounter((preValue) => preValue - 1)
        }
    }

    function highlightCurrentPictureKnob(knobNumber, sliderButtons) {
        for (let i = 0; i < sliderButtons.length; i++) {
            sliderButtons[i].classList.remove("bg-white")
            sliderButtons[i].classList.add("bg-gray-400")
        }
        sliderButtons[knobNumber - 1].classList.remove("bg-gray-400")
        sliderButtons[knobNumber - 1].classList.add("bg-white")
    }

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

    let [firstRun, setFirstRun] = useState(true)
    useEffect(() => {
        let sliderButtons = document.querySelectorAll("#sliderBtn");
        switch (pictureCounter) {
            case 1:
                if (firstRun) {
                    setFirstRun(false)
                    highlightCurrentPictureKnob(pictureCounter, sliderButtons)
                }else{
                    swipeRight(kep5, kep1, kep2)
                    highlightCurrentPictureKnob(pictureCounter, sliderButtons)
                }
                break;
            case 2:
                swipeRight(kep1, kep2, kep3)
                highlightCurrentPictureKnob(pictureCounter, sliderButtons)
                break;
            case 3:
                swipeRight(kep2, kep3, kep4)
                highlightCurrentPictureKnob(pictureCounter, sliderButtons)
                break;
            case 4:
                swipeRight(kep3, kep4, kep5)
                highlightCurrentPictureKnob(pictureCounter, sliderButtons)
                break;
            case 5:
                swipeRight(kep4, kep5, kep1)
                highlightCurrentPictureKnob(pictureCounter, sliderButtons)
                break;
            default:
                swipeRight(kep5, kep1, kep2)
                highlightCurrentPictureKnob(pictureCounter, sliderButtons)
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

    return (
        <div className="w-full h-[500px] relative">
            <div className="w-full h-full relative">
                <img id="prevPic" className="h-full absolute ease-out -left-full w-full" src={previousSlideshowPicture} />
                <img id="currPic" className="h-full absolute w-full ease-out" src={currentSlideshowPicture} />
                <img id="nextPic" className="h-full absolute -right-full ease-out w-full" src={nextSlideshowPicture} />

                <div className="flex text-4xl stroke-2 w-24 justify-between absolute bottom-3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <button id="sliderBtn" value={1} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 border-solid border-black border-[1px]"></button>
                    <button id="sliderBtn" value={2} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 border-solid border-black border-[1px]"></button>
                    <button id="sliderBtn" value={3} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 border-solid border-black border-[1px]"></button>
                    <button id="sliderBtn" value={4} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 border-solid border-black border-[1px]"></button>
                    <button id="sliderBtn" value={5} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 border-solid border-black border-[1px]"></button>
                </div>
            </div>
            <button onClick={swipeLeft}><FontAwesomeIcon className="text-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-5 h-10" icon={faChevronLeft} /></button>
            <button onClick={swipeRight}><FontAwesomeIcon className="text-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 right-5 h-10" icon={faChevronRight} /></button>
        </div>

    )

}

export default ImageSlider