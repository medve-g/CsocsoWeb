import { useState } from "react";
import { Link } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log(email);
      console.log(password);
      await login(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (email, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    setToken(data.access_token);
    setUser(data.user);
    localStorage.setItem("token", data.access_token);
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="px-5 text-left">
              <label className="font-medium text-lg">Jelszó</label>
              <input
                className="w-full border rounded-xl p-3 mt-1"
                placeholder="Írja be a jelszavát"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-right pr-5 mt-2 hover:text-green-600 cursor-pointer">
              <p>Elfelejtette jelszavát?</p>
            </div>
            <div className="w-full p-5 mt-3">
              <button
                className="w-full border-2 rounded-md p-3 font-bold bg-green-600 text-white text-lg border-gray-500 hover:text-gray-600 hover:bg-white hover:border-green-600"
                onClick={handleLogin}
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
