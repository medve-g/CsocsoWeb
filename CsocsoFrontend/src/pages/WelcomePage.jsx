import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import kep1 from "../../public/kep1.jpg";
import kep2 from "../../public/kep2.jpg";
import kep3 from "../../public/kep3.jpg";

import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import ImageSlider from "../components/ImageSlider.jsx";


// News Slider arrow customization
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

    // News Slider settings
    let SliderSettings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],

        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
        
    };

    

    // News
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

            <Header />
            <ImageSlider/>
            

            {/* About */}
            <section id="About-Box"className="py-16 px-6 md:px-12 lg:px-24 text-green-900">
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
            <section id="News-Slider-Box" className="py-16 px-6 md:px-12 lg:px-24 text-green-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-green-700 mb-6">Hírek</h2>
                </div>
            </section>
            <div id="News-Slider-Box" className='h-[400px] pt-10'>
                <div className='h-[400px] w-3/4 m-auto '>
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
            <Footer />


        </>
    );
}
