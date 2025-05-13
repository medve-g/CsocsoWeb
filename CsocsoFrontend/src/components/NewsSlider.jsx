import { useState, useEffect, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

let enableButton = (user) => {
    if (user.contest_admin == 1) {
        return (
            <div id="Add-News-Button" className="w-full flex justify-end">
                <Link to="/AddNews">
                    <button className="bg-green-500 rounded-md font-bold text-white text-2xl p-3 border-2 hover:bg-white hover:border-green-500 hover:text-green-500">
                        Új Hír
                    </button>
                </Link>
            </div>
        );
    } else {
        return <></>;
    }
};

// API Fetch 
function ApiConnect({ setAdat }) {
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/newsApi")
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map((newsItem) => ({
                    image: newsItem.imagepath,
                    title: newsItem.title
                }));

                setAdat(formattedData);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return null;
}

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green-100" }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green-100" }}
            onClick={onClick}
        />
    );
}

export function NewsSlider() {
    const [adat, setAdat] = useState([]);
    const [user, setUser] = useContext(UserContext);

    return (
        <>
            <ApiConnect setAdat={setAdat} />

            <section id="News-Slider-Box" className="pt-10 px-6 md:px-12 lg:px-24 text-green-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-green-700 mb-6">Hírek</h2>
                </div>
            </section>

            <div id="News-Slider-Box" className="h-[400px] pt-10">
                {enableButton(user)}

                <div className="h-[400px] w-3/4 m-auto">
                    <Slider
                        dots={false}
                        infinite={adat.length > 2}
                        autoplay={true}
                        autoplaySpeed={2000}
                        speed={500}
                        slidesToShow={3}
                        slidesToScroll={1}
                        responsive={[
                            { breakpoint: 1024, settings: { slidesToShow: 3 } },
                            { breakpoint: 750, settings: { slidesToShow: 2 } },
                            { breakpoint: 480, settings: { slidesToShow: 1 } }
                        ]}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                    >
                        {adat.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-xl shadow-black-500/50 w-80 text-center">
                                <div className="flex justify-center items-center h-40">
                                    <img src={item.image} className="w-full h-full object-cover block" alt={item.title} />
                                </div>
                                <div className="p-10 bg-green-600 rounded-b-lg">
                                    <Link to="/clickednews" state={{ title: item.title }}>
                                        <p className="font-semibold text-white">{item.title}</p>
                                    </Link>
                                </div>

                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
}
