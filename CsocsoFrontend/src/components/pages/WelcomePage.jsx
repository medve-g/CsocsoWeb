import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import kep1 from "../../../public/kep1.jpg";
import kep2 from "../../../public/kep2.jpg";
import kep3 from "../../../public/kep3.jpg";
import kep4 from "../../../public/kep4.jpg";
import kep5 from "../../../public/kep5.jpg";

import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";


export function WelcomePage() {

    // Slider settings
    let SliderSettings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        dots: true,
    };

    // Slider
    const adat = [
        {
            image: kep1
        },
        {
            image: kep2
        },
        {
            image: kep3
        },
        {
            image: kep4
        },
        {
            image: kep5
        }
    ];
    

    return (
        <>
            
            <Header/>
            
            {/* Slider */}
            <section>
            <div className='bg-green-100'>
                <div className='h-{400px} w-full m-auto '>
                    <Slider {...SliderSettings}>
                        {adat.map((item, index) => (
                            <div key={index} className=" bg-white rounded-2xl shadow-xl shadow-black-500/50  text-center">
                                <div  className="flex justify-center items-center">
                                    <img src={item.image} className="slider-image"/>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            </section>

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
            <Footer/>
            

        </>
    );
}
