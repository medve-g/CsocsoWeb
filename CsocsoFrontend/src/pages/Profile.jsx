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
        console.log("Stored User:", storedUser);
    }, []);



    const logOut = () => {
        localStorage.removeItem("user");
        setUser({});
        navigate("/");
    };

    return (
        <div className="w-full flex justify-center items-center my-20">
            <div className="bg-white w-full max-w-[1000px] px-5 sm:px-10 py-10 sm:py-20 rounded-xl drop-shadow-lg mx-auto">
                <h1 className="mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-[45px] text-center font-semibold">
                    {user?.username || "Felhasználó"}
                </h1>
                <div className="py-10">

                    <div className="px-5 text-left pb-5">
                        <label className="font-medium text-lg">Email: </label>
                        <label className="font-medium px-1 pr-5">{user?.email}</label>

                        <button className="bg-green-500 rounded-md font-bold text-white text-xs p-3 border-1 hover:bg-green-600">
                            Email cím megváltoztatása
                        </button>

                    </div>

                    <div className="px-5 text-left">
                    <label className="font-medium text-lg">Eddigi versenyeim: </label><p/>
                    

                    </div>

                </div>

                <div className="flex justify-between w-full">
                    <button className="bg-green-500 rounded-md font-bold text-white text-lg sm:text-xl px-4 py-2 hover:bg-green-600">
                        Jelszó megváltoztatása
                    </button>

                    <button className="bg-green-500 rounded-md font-bold text-white text-lg sm:text-xl px-4 py-2 hover:bg-green-600"
                        onClick={logOut}>
                        Kijelentkezés
                    </button>
                </div>

            </div>
        </div>
    );
}
