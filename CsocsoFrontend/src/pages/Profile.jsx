import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useState, useContext, useEffect } from "react";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});

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

    const inputValidation = (name, value) => {
        let errorMessage = "";

        if (name === "new_password" && value.length < 8) {
            errorMessage = "Az új jelszónak legalább 8 karakter hosszúnak kell lennie!";
        }

        if (name === "new_password_confirmation" && value !== passwordchangeData.new_password) {
            errorMessage = "Az új jelszó és megerősítése nem egyezik!";
        }

        setErrors((prev) => ({
            ...prev,
            [name]: errorMessage,
        }));
    };

    const isFormValid = () => {
        return (
            passwordchangeData.current_password.length >= 8 &&
            passwordchangeData.new_password.length >= 8 &&
            passwordchangeData.new_password === passwordchangeData.new_password_confirmation &&
            !errors.current_password &&
            !errors.new_password &&
            !errors.new_password_confirmation
        );
    };

    let [passwordchangeData, setpasswordchangeData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setpasswordchangeData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fetchUserRegistrations = async () => {
        let res = await fetch(`http://127.0.0.1:8000/api/useRregistrationGetter/${user.id}`)
        let data = await res.json()
        console.log(data)
    }


    const handleChangePassword = async () => {
        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/user/changePassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(passwordchangeData)
            });

            if (response.status === 401) {
                alert("Bejelentkezési hiba. Kérlek jelentkezz be újra.");
                logOut();
                navigate("/login");
                return;
            }

            if (response.ok) {
                alert("Jelszó sikeresen megváltoztatva! Kérlek lépj be újra!");
                setShowPopup(false);
                navigate("/login");
                localStorage.removeItem("user");
                setUser({});
            } else {
                const data = await response.json();
                console.error("Server response error:", data);
                alert("Hiba történt! " + (data.message || "Ismeretlen hiba"));
            }
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Hiba történt a jelszó váltása közben.");
        }
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

                    <div className="text-right">
                        <button className="bg-green-500 rounded-md font-bold text-white text-sm px-4 py-2 border hover:bg-green-600" onClick={() => navigate("/profiledatachange")}>
                            Adatok módosítása
                        </button>
                    </div>
                </div>

                <div className="px-6 pt-5 text-center w-full">
                    <label className="font-semibold text-lg">Eddigi nevezéseim:</label>
                    <p className="text-gray-600">Jelenleg nincs nevezésed.</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between mt-10 w-full">
                    <button className="bg-green-500 rounded-md font-bold text-white text-lg sm:text-xl px-6 py-3 w-full sm:w-auto hover:bg-green-600" onClick={() => setShowPopup(true)}>
                        Jelszó megváltoztatása
                    </button>

                    <button className="bg-red-500 rounded-md font-bold text-white text-lg sm:text-xl px-6 py-3 w-full sm:w-auto hover:bg-red-600"
                        onClick={logOut}>
                        Kijelentkezés
                    </button>
                </div>
            </div>

        
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                        <h2 className="text-xl font-bold mb-4">Jelszó módosítása</h2>

                        <label className="block text-gray-700 font-semibold mb-2">Jelenlegi jelszó:</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg mb-4"
                            name="current_password"
                            value={passwordchangeData.current_password}
                            onChange={handleChange}
                            onBlur={(e) => inputValidation(e.target.name, e.target.value)}
                        />
                        {errors.current_password && <small className="text-red-500">{errors.current_password}</small>}

                        <label className="block text-gray-700 font-semibold mb-2">Új jelszó:</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg mb-4"
                            name="new_password"
                            value={passwordchangeData.new_password}
                            onChange={handleChange}
                            onBlur={(e) => inputValidation(e.target.name, e.target.value)}
                        />
                        {errors.new_password && <small className="text-red-500">{errors.new_password}</small>}

                        <label className="block text-gray-700 font-semibold mb-2">Új jelszó megerősítése:</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg mb-4"
                            name="new_password_confirmation"
                            value={passwordchangeData.new_password_confirmation}
                            onChange={handleChange}
                            onBlur={(e) => inputValidation(e.target.name, e.target.value)}
                        />
                        {errors.new_password_confirmation && <small className="text-red-500">{errors.new_password_confirmation}</small>}

                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                onClick={() => {
                                    setShowPopup(false);
                                    setpasswordchangeData({
                                        current_password: "",
                                        new_password: "",
                                        new_password_confirmation: ""
                                    });
                                    setErrors({});
                                }}
                            >
                                Mégse
                            </button>

                            <button
                                className={`px-4 py-2 rounded-md ${isFormValid() ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-400 cursor-not-allowed text-gray-700"}`}
                                onClick={handleChangePassword}
                                disabled={!isFormValid()}
                            >
                                Mentés
                            </button>


                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
