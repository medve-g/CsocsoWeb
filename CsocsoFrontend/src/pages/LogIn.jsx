import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function LogIn() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  let [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  let displayError = (errorMessage) => {
    if (errorMessage == "") {
      return;
    } else {
      return (
        <div className="mx-5 mt-3 p-3 rounded-lg border-4 border-red-700 bg-red-100 text-red-700 font-bold text-lg shadow-md">
          <p>{errorMessage}</p>
        </div>  
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let handleLogIn = async () => {
    try {
        let res = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logInData),
        });

        console.log("Response status:", res.status);
        
        let data = await res.json();
        console.log("Received response:", data);

        if (!res.ok) {
            setErrorMessage(data.message);
            throw new Error(data.message || "Hiba a belépés során!");
        }

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);
        navigate("/");
    } catch (err) {
        console.error("Fetch error:", err);
    }
};


  return (
    <>
      <div className="w-full flex justify-center items-center my-20">
        <div className="bg-white w-[1000px] px-10 py-20 rounded-xl drop-shadow-lg max-lg:rounded-none max-sm:px-1 max-sm:py-8 ">
          <h1 className="mb-10 mx-5 text-[45px] text-center max-sm:text-[35px]  text-black font-semibold">
            Bejelentkezés
          </h1>
          <div className="flex flex-col">
            <div className="px-5 text-left">
              <label className="font-medium text-lg">Email</label>
              <input
                className="w-full border rounded-xl p-3 mt-1 mb-3"
                placeholder="Írja be az email címét"
                type="email"
                name="email"
                value={logInData.email}
                onChange={handleChange}
              />
            </div>
            <div className="px-5 text-left">
              <label className="font-medium text-lg">Jelszó</label>
              <input
                className="w-full border rounded-xl p-3 mt-1"
                placeholder="Írja be a jelszavát"
                type="password"
                name="password"
                value={logInData.password}
                onChange={handleChange}
              />
            </div>
            {displayError(errorMessage)}
            <div className="text-right pr-5 mt-2 hover:text-green-600 cursor-pointer">
              <p>Elfelejtette jelszavát?</p>
            </div>
            <div className="w-full p-5 mt-3">
              <button
                className="w-full border-2 rounded-md p-3 font-bold bg-green-600 text-white text-lg border-gray-500 hover:text-gray-600 hover:bg-white hover:border-green-600"
                onClick={handleLogIn}
              >
                Bejelentkezés
              </button>
            </div>
            <div className="flex mt-3 px-5 justify-between">
              <p>Nincs még fiókod</p>
              <Link to="/registration">
                <p className="hover:text-green-600 cursor-pointer">
                  Regisztráció
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
