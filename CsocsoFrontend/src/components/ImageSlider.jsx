import kep1 from "../../public/kep1.jpg";
import kep2 from "../../public/kep2.jpg";
import kep3 from "../../public/kep3.jpg";
import kep4 from "../../public/kep4.jpg";
import kep5 from "../../public/kep5.jpg";

import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'

function ImageSlider() {
      
      const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '400px',
        width: '100%',
        backgroundPosition: 'top center'
      }

      const slideImages = [
        {
          url: kep1
        },
        {
          url: kep2
        },
        {
          url: kep3
        },
        {
          url: kep4
        },
        {
          url: kep5
        },
      ];

    return (
        <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))} 
        </Slide>
      </div>

    )

}

export default ImageSlider