import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

export function ClickedNewsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [newsList, setNewsList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [user, setUser] = useContext(UserContext);

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

    const deleteNews = async () => {
        if (currentIndex !== null && newsList.length > 0) {
            const currentNews = newsList[currentIndex];

            if (!currentNews?.id) {
                console.error("Error: News ID missing!");
                return;
            }

            const confirmDelete = window.confirm("Biztosan törölni szeretnéd ezt a hírt?");
            if (!confirmDelete) return;

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/newsApi/${currentNews.id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("API Error:", errorData);
                    return;
                }

                const updatedNewsList = newsList.filter(news => news.id !== currentNews.id);
                setNewsList(updatedNewsList);

                if (updatedNewsList.length > 0) {
                    navigate("/clickednews", { state: updatedNewsList[Math.max(0, currentIndex - 1)] });
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error deleting news:", error);
            }
        }
    };

    const enableDeleteButton = (user, deleteNews) => {
        if (user?.contest_admin === 1) {
            return (
                <div id="Delete-News-Button" className="w-full flex justify-end">
                    <button
                        onClick={deleteNews}
                        className="bg-red-500 rounded-lg font-bold text-white text-2xl p-3 border-2 border-red-700 hover:bg-red-700 hover:border-red-900 hover:text-white shadow-md transition duration-300">
                        Hír törlése
                    </button>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="w-full flex justify-center items-center my-20">
            <div className="bg-white w-full max-w-[1000px] px-5 sm:px-10 py-10 sm:py-20 rounded-xl drop-shadow-lg mx-auto">
                {enableDeleteButton(user, deleteNews)}
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
                        <button className="bg-green-500 rounded-md font-bold text-white text-lg sm:text-xl px-4 py-2 hover:bg-green-600 transition">
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
