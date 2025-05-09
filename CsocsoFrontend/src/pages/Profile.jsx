import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useState, useContext, useEffect } from "react";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser); 
        }
    }, []);



    const logOut = () => {
        localStorage.removeItem("user");
        setUser({});
        navigate("/");
    };

    return (
        <div className="w-full flex justify-center items-center my-20 px-4">
            <div className="bg-white w-full max-w-[1000px] px-6 sm:px-12 py-12 sm:py-24 rounded-2xl shadow-xl mx-auto flex flex-col items-center">
                <h1 className="mb-8 text-3xl sm:text-4xl md:text-5xl text-center font-bold text-gray-800">
                    {user?.username || "Felhasználó"}
                </h1>

                <div className="space-y-6 py-8 w-full">
                    <div className="px-6 py-6 flex items-center justify-between bg-gray-100 rounded-lg">
                        <div className="flex gap-x-4 items-center flex-1">
                            <label className="font-semibold text-lg">Email:</label>
                            <span className="text-gray-700">{user?.email}</span>
                        </div>
                    </div>


                    <div className="px-6 py-6 flex items-center justify-between bg-gray-100 rounded-lg">
                        <div className="flex gap-x-4 items-center flex-1">
                            <label className="font-semibold text-lg">Telefonszám:</label>
                            <span className="text-gray-700">{user?.phonenumber}</span>
                        </div>
                    </div>


                    <div className="px-6 py-6 flex items-center justify-between bg-gray-100 rounded-lg">
                        <div className="flex gap-x-4 items-center flex-1">
                            <label className="font-semibold text-lg">Nem:</label>
                            <span className="text-gray-700">{user?.gender}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <button class="bg-green-500 rounded-md font-bold text-white text-sm px-4 py-2 border hover:bg-green-600" onClick={() => navigate("/profiledatachange")}>
                            Adatok módosítása
                        </button>
                    </div>
                </div>


                <div className="px-6 pt-5 text-center w-full">
                    <label className="font-semibold text-lg">Eddigi versenyeim:</label>
                    <p className="text-gray-600">Jelenleg nincs versenyadat.</p>
                </div>


                <div className="flex flex-col sm:flex-row justify-between mt-10 w-full">
                    <button className="bg-green-500 rounded-md font-bold text-white text-lg sm:text-xl px-6 py-3 w-full sm:w-auto hover:bg-green-600">
                        Jelszó megváltoztatása
                    </button>

                    <button className="bg-red-500 rounded-md font-bold text-white text-lg sm:text-xl px-6 py-3 w-full sm:w-auto hover:bg-red-600"
                        onClick={logOut}>
                        Kijelentkezés
                    </button>
                </div>
            </div>
        </div>


    );
}
