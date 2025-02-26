import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import kep1 from "../../../public/kep1.jpg";
import kep2 from "../../../public/kep2.jpg";
import kep3 from "../../../public/kep3.jpg";
import kep4 from "../../../public/kep4.jpg";
import kep5 from "../../../public/kep5.jpg";
import logo from "../../../public/logo.png";

// Slider arrow customization
function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: 'green-100' }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: 'green-100' }}
            onClick={onClick}
        />
    );
}

export function WelcomePage() {
    // Slider settings
    let SliderSettings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    let [slideShowPicture, setSlideShowPicture] = useState(kep1);
    let [pictureCounter, setPictureCounter] = useState(1);

    let chooseSliderPicture = (event) => {
        let numberOfSliderBtn = event.target.value;
        setPictureCounter(numberOfSliderBtn);
        setSlideShowPicture(eval(`kep${numberOfSliderBtn}`));
    }

    useEffect(() => {
        let sliderButtons = document.querySelectorAll("#sliderBtn");
        sliderButtons.forEach((button, index) => {
            if (index + 1 === pictureCounter) {
                button.classList.add("bg-white");
            } else {
                button.classList.remove("bg-white");
            }
        });

        let pictureCounterIncreaser = setInterval(() => {
            setPictureCounter((prevCounter) => (prevCounter % 5) + 1);
        }, 7000);

        return () => clearInterval(pictureCounterIncreaser);
    }, [pictureCounter]);

    // Hírek
    const adat = [
        {
            image: kep1,
            title: 'Hír1'
        },
        {
            image: kep2,
            title: 'Hír2'
        },
        {
            image: kep3,
            title: 'Hír3'
        },
    ];

    return (
        <>
            {/* Header */}
            <div className="p-5 bg-[#5fbe20] h-32 text-white flex justify-between">
                <div className="inline-block cursor-pointer"><img className="h-full" src={logo} alt="CsocsoLogo" /></div>
                <div className="flex items-center justify-around">
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Rólunk</div>
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Versenyek</div>
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Profil</div>
                </div>
            </div>

            {/* Slider */}
            <div className="w-full h-[600px]">
                <div className="w-full h-full relative">
                    <img className="h-full w-full cursor-pointer" src={slideShowPicture} />
                    <div className="skibidi flex text-4xl stroke-2 w-24 justify-between absolute bottom-3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {Array.from({ length: 5 }, (_, i) => (
                            <button key={i} id="sliderBtn" value={i + 1} onClick={chooseSliderPicture} className="rounded-full w-2 h-2 bg-gray-400 border-solid border-black border-[1px]"></button>
                        ))}
                    </div>
                </div>
            </div>

            {/* About */}
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

            {/* News */}
            <section className="bg-green-100 py-16 px-6 md:px-12 lg:px-24 text-green-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-green-700 mb-6">Hírek</h2>
                </div>
            </section>
            <div className='h-screen bg-green-100 pt-10'>
                <div className='h-{400px} w-3/4 m-auto '>
                    <Slider {...SliderSettings}>
                        {adat.map((item, index) => (
                            <div key={index} className=" bg-white rounded-2xl shadow-xl shadow-black-500/50 w-80 text-center">
                                <div className="flex justify-center items-center h-40">
                                    <img src={item.image} className="w-full h-full object-cover block" />
                                </div>
                                <div className="p-10 bg-green-600 rounded-b-lg ">
                                    <p className="font-semibold text-white">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

        </>
    );
}
