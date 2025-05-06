import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function ClickedNewsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [newsList, setNewsList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/newsApi")
            .then(response => response.json())
            .then(data => {
                setNewsList(data);
                const index = data.findIndex(newsItem => newsItem.title === location.state?.title);
                setCurrentIndex(index);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [location.state?.title]);

    if (currentIndex === null || newsList.length === 0) return <p>Betöltés...</p>;

    const currentNews = newsList[currentIndex];

    const goToPrevious = () => {
        if (currentIndex > 0) {
            navigate("/clickednews", { state: newsList[currentIndex - 1] });
        }
    };

    const goToNext = () => {
        if (currentIndex < newsList.length - 1) {
            navigate("/clickednews", { state: newsList[currentIndex + 1] });
        }
    };

    return (
        <div className="w-full flex justify-center items-center my-20">
            <div className="bg-white w-full max-w-[1000px] px-5 sm:px-10 py-10 sm:py-20 rounded-xl drop-shadow-lg mx-auto">
                <h1 className="mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-[45px] text-center font-semibold">
                    {currentNews?.title}
                </h1>
                <div className="w-full max-w-[800px] mx-auto">
                    <img
                        src={currentNews?.imagepath}
                        className="w-full h-auto object-contain block"
                        alt={currentNews?.title}
                    />
                </div>

                <div className="mt-5 text-base sm:text-lg pl-3 sm:pl-5">
                    {currentNews?.content.split(/\r\n/).filter(line => line.trim() !== "").map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>

                <div className="relative flex justify-between items-center px-6 py-3">
                    <button
                        id="ClickedNews-Prev"
                        onClick={goToPrevious}
                        className={`bg-green-500 rounded-md font-bold text-white text-lg sm:text-xl px-4 py-2 hover:bg-green-600 transition 
                            ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
                        Előző
                    </button>

                    <div className="flex justify-center w-full">
                        <button id="ClickedNews-BackTo-Homepage" className="bg-green-500 rounded-md font-bold text-white text-lg sm:text-xl px-4 py-2 hover:bg-green-600 transition">
                            <Link to="/">Vissza a főoldalra</Link>
                        </button>
                    </div>

                    <button
                        id="ClickedNews-Next"
                        onClick={goToNext}
                        className={`bg-green-500 rounded-md font-bold text-white text-lg sm:text-xl px-4 py-2 hover:bg-green-600 transition 
                            ${currentIndex === newsList.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
                        Következő
                    </button>
                </div>
            </div>
        </div>

    );
}
