import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

export default function ProfilDataChange() {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    const [showNameInput, setShowNameInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(false);
    const [showGenderInput, setShowGenderInput] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            console.log(storedUser);
        }
    }, []);

   const updateUserData = async () => {
    try {
        const token = localStorage.getItem("authToken");
        
        console.log("Sending update request with:", user);

        const response = await fetch("http://127.0.0.1:8000/api/user/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                username: user?.username,
                email: user?.email,
                phonenumber: user?.phonenumber,
                gender: user?.gender
            })
        });

        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("Received response:", data);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${data.error}`);
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Profil adatainak módosítása sikeresen megtörtént!");
    } catch (error) {
        console.error("Hiba az adatok módosítása során:", error);
        alert("Hiba az adatok módosítása során!");
    }
};

    
    
    return (
        <>
            <div className="w-full flex justify-center items-center my-20 px-4">
                <div className="bg-white w-full max-w-[1000px] px-6 sm:px-12 py-12 sm:py-24 rounded-2xl shadow-xl mx-auto flex flex-col items-center">

                    {!showNameInput ? (
                        <h1
                            className="mb-8 text-3xl sm:text-4xl md:text-5xl text-center font-bold text-gray-800"
                            onDoubleClick={() => setShowNameInput(true)}
                        >
                            {user?.username}
                        </h1>

                    ) : (
                        <input
                            className="border border-gray-400 p-2 rounded text-lg font-bold text-gray-700"
                            value={user?.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />

                    )}



                    <div className="space-y-6 py-8 w-full">
                        <div className="px-6 py-6 flex items-center justify-between bg-gray-100 rounded-lg">
                            <div className="flex gap-x-4 items-center flex-1">
                                <label className="font-semibold text-lg">Email:</label>
                                {!showEmailInput ? (
                                    <span className="text-gray-700"
                                        onDoubleClick={() => setShowEmailInput(true)}
                                    >
                                        {user?.email}
                                        
                                    </span>

                                ) : (
                                    <input
                                        className="border border-gray-400 p-2 rounded text-lg font-bold text-gray-700"
                                        value={user?.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />

                                )}

                            </div>
                        </div>


                        <div className="px-6 py-6 flex items-center justify-between bg-gray-100 rounded-lg">
                            <div className="flex gap-x-4 items-center flex-1">
                                <label className="font-semibold text-lg">Telefonszám:</label>
                                {!showPhoneNumberInput ? (
                                    <span className="text-gray-700"
                                        onDoubleClick={() => setShowPhoneNumberInput(true)}
                                    >
                                        {user?.phonenumber}
                                    </span>

                                ) : (
                                    <input
                                        className="border border-gray-400 p-2 rounded text-lg font-bold text-gray-700"
                                        value={user?.phonenumber}
                                        onChange={(e) => setUser({ ...user, phonenumber: e.target.value })}
                                    />

                                )}
                            </div>
                        </div>


                        <div className="px-6 py-6 flex items-center justify-between bg-gray-100 rounded-lg">
                            <div className="flex gap-x-4 items-center flex-1">
                                <label className="font-semibold text-lg">Nem:</label>
                                {!showGenderInput ? (
                                    <span
                                        className="text-gray-700 cursor-pointer"
                                        onDoubleClick={() => setShowGenderInput(true)}
                                    >
                                        {user?.gender}
                                    </span>
                                ) : (
                                    <input
                                        className="border border-gray-400 p-2 rounded text-lg font-bold text-gray-700"
                                        value={user?.gender}
                                        onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between mt-10 w-full">

                            <button
                                className="bg-green-500 rounded-md font-bold text-white text-lg sm:text-xl px-6 py-3 w-full sm:w-auto hover:bg-green-600"
                                onClick={updateUserData}
                            >
                                Rendben
                            </button>


                            <button className="bg-green-500 rounded-md font-bold text-white text-lg sm:text-xl px-6 py-3 w-full sm:w-auto hover:bg-green-600">
                                Jelszó megváltoztatása
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}