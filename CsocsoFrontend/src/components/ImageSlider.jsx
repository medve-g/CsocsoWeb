import kep1 from "../../public/kep1.jpg";
import kep2 from "../../public/kep2.jpg";
import kep3 from "../../public/kep3.jpg";
import kep4 from "../../public/kep4.jpg";
import kep5 from "../../public/kep5.jpg";

import React from "react"
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'
import { useEffect, useState } from "react";

function ImageSlider() {

    const spanStyle = {
        padding: '20px',
        background: '#efefef',
        color: '#000000'
      }
      
      const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '400px'
      }
      const slideImages = [
        {
          url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
          caption: 'Slide 1'
        },
        {
          url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
          caption: 'Slide 2'
        },
        {
          url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
          caption: 'Slide 3'
        },
      ];
    let [pictureCounter, setPictureCounter] = useState(1);

    // function swipeRight(paramPreviousSlideshowPicture, paramCurrentSlideshowPicture, paramNextSlideshowPicture) {
    //     let collectImagePlaceholders = [document.getElementById("prevPic"), document.getElementById("currPic"), document.getElementById("nextPic")]

    //     collectImagePlaceholders[2].classList.add("duration-500")
    //     collectImagePlaceholders[1].classList.add("duration-500")
    //     collectImagePlaceholders[1].classList.add("-translate-x-full")
    //     collectImagePlaceholders[2].classList.add("-translate-x-full")
    //     setTimeout(() => {
    //         setPreviousSlideshowPicture(paramPreviousSlideshowPicture)
    //         setCurrentSlideshowPicture(paramCurrentSlideshowPicture)
    //         setNextSlideshowPicture(paramNextSlideshowPicture)
    //         collectImagePlaceholders[2].classList.remove("duration-500")
    //         collectImagePlaceholders[1].classList.remove("duration-500")
    //         collectImagePlaceholders[2].classList.remove("-translate-x-full")
    //         collectImagePlaceholders[1].classList.remove("-translate-x-full")
    //     }, 600)

    // }

    // function selectNextSliderPicture() {

    // }

    // function swipeLeft() {
    //     if (pictureCounter == 1) {
    //         setPictureCounter(5)
    //     } else {
    //         setPictureCounter((preValue) => preValue - 1)
    //     }
    // }

    // function highlightCurrentPictureKnob(knobNumber, sliderButtons) {
    //     for (let i = 0; i < sliderButtons.length; i++) {
    //         sliderButtons[i].classList.remove("bg-white")
    //         sliderButtons[i].classList.add("bg-gray-400")
    //     }
    //     sliderButtons[knobNumber - 1].classList.remove("bg-gray-400")
    //     sliderButtons[knobNumber - 1].classList.add("bg-white")
    // }

    // let chooseSliderPicture = (event) => {
    //     let numberOfSliderBtn = event.target.value
    //     if (pictureCounter < numberOfSliderBtn) {
    //         let calculatedSliderNumber = numberOfSliderBtn - pictureCounter;
    //         setPictureCounter((preValue) => preValue + calculatedSliderNumber)
    //     } else if (pictureCounter > numberOfSliderBtn) {
    //         let calculatedSliderNumber = pictureCounter - numberOfSliderBtn
    //         setPictureCounter((preValue) => preValue - calculatedSliderNumber)
    //     }
    // }

    // let [firstRun, setFirstRun] = useState(true)
    // useEffect(() => {
    //     let sliderButtons = document.querySelectorAll("#sliderBtn");
    //     switch (pictureCounter) {
    //         case 1:
    //             if (firstRun) {
    //                 setFirstRun(false)
    //                 highlightCurrentPictureKnob(pictureCounter, sliderButtons)
    //             } else {
    //                 swipeRight(kep5, kep1, kep2)
    //                 highlightCurrentPictureKnob(pictureCounter, sliderButtons)
    //             }
    //             break;
    //         case 2:
    //             swipeRight(kep1, kep2, kep3)
    //             highlightCurrentPictureKnob(pictureCounter, sliderButtons)
    //             break;
    //         case 3:
    //             swipeRight(kep2, kep3, kep4)
    //             highlightCurrentPictureKnob(pictureCounter, sliderButtons)
    //             break;
    //         case 4:
    //             swipeRight(kep3, kep4, kep5)
    //             highlightCurrentPictureKnob(pictureCounter, sliderButtons)
    //             break;
    //         case 5:
    //             swipeRight(kep4, kep5, kep1)
    //             highlightCurrentPictureKnob(pictureCounter, sliderButtons)
    //             break;
    //         default:
    //             swipeRight(kep5, kep1, kep2)
    //             highlightCurrentPictureKnob(pictureCounter, sliderButtons)
    //             break;
    //     }

    //     let pictureCounterIncreaser = setInterval(() => {
    //         if (pictureCounter == 5) {
    //             setPictureCounter(1)
    //         } else {
    //             setPictureCounter((prevPictureCounter) => prevPictureCounter + 1)
    //         }
    //     }, 7000)



    //     return () => clearInterval(pictureCounterIncreaser)

    // }, [pictureCounter])

    return (
        <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                <span style={spanStyle}>{slideImage.caption}</span>
              </div>
            </div>
          ))} 
        </Slide>
      </div>

    )

}

export default ImageSlider