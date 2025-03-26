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

    function swipeRight(){
        let collectImagePlaceholders = [document.getElementById("prevPic"), document.getElementById("currPic"), document.getElementById("nextPic")]
        
        collectImagePlaceholders[1].classList.add("-translate-x-full")
        collectImagePlaceholders[2].classList.add("-translate-x-full")
        setPreviousSlideshowPicture(kep1)
        setCurrentSlideshowPicture(kep2)
        setNextSlideshowPicture(kep3)
        setTimeout(()=>{
            collectImagePlaceholders[2].classList.remove("-translate-x-full")
            collectImagePlaceholders[1].classList.remove("-translate-x-full")
        },600)
        
    }

    function swipeLeft(){
        if (pictureCounter == 1) {
            setPictureCounter(5)
        }else{
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

    useEffect(() => {
        let sliderButtons = document.querySelectorAll("#sliderBtn");
        switch (pictureCounter) {
            case 1:
                setPreviousSlideshowPicture(kep5)
                setCurrentSlideshowPicture(kep1)
                setNextSlideshowPicture(kep2)
                highlightCurrentPictureKnob(pictureCounter, sliderButtons)
                break;
            case 2:
                setPreviousSlideshowPicture(kep1)
                setCurrentSlideshowPicture(kep2)
                setNextSlideshowPicture(kep3)
                highlightCurrentPictureKnob(pictureCounter, sliderButtons)
                break;
            case 3:
                setPreviousSlideshowPicture(kep2)
                setCurrentSlideshowPicture(kep3)
                setNextSlideshowPicture(kep4)
                highlightCurrentPictureKnob(pictureCounter, sliderButtons)
                break;
            case 4:
                setPreviousSlideshowPicture(kep3)
                setCurrentSlideshowPicture(kep4)
                setNextSlideshowPicture(kep5)
                highlightCurrentPictureKnob(pictureCounter, sliderButtons)
                break;
            case 5:
                setPreviousSlideshowPicture(kep4)
                setCurrentSlideshowPicture(kep5)
                setNextSlideshowPicture(kep1)
                highlightCurrentPictureKnob(pictureCounter, sliderButtons)
                break;
            default:
                setPreviousSlideshowPicture(kep5)
                setCurrentSlideshowPicture(kep1)
                setNextSlideshowPicture(kep2)
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
                <img id="prevPic" className="h-full absolute -left-full w-full duration-500" src={previousSlideshowPicture} />
                <img id="currPic" className="h-full absolute w-full duration-500" src={currentSlideshowPicture} />
                <img id="nextPic" className="h-full absolute -right-full w-full duration-500" src={nextSlideshowPicture} />

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