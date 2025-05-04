import { useState } from "react";
import { Link } from "react-router-dom";

export function SignUp() {
  let [formatData, setFormatData] = useState({
    username: "",
    email:"",
    password:"",
    passwordAgain:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormatData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  let handleRegistration = () => {
    console.log(formatData)
  };
  return (
    <div className="w-full flex justify-center items-center my-20">
      <div className="bg-white w-[1000px] px-10 py-20 rounded-xl drop-shadow-lg max-sm:px-1 max-sm:py-8 ">
        <h1 className="mb-10 mx-5 text-[45px] text-center max-sm:text-[35px]  text-black font-semibold">
          Regisztráció
        </h1>
        <div className="flex flex-col">
          <div className="flex justify-between mb-5">
            <div className="px-5 text-left w-[400px]">
              <label className="font-medium text-lg">Felhasználónév</label>
              <br />
              <input
                className="w-full border rounded-xl p-3 mt-1 mb-3"
                placeholder="Írja be a felhasználó nevét"
                type="text"
                name="username"
                value={formatData.username}
                onChange={handleChange}
              />
            </div>
            <div className="px-5 text-left w-[400px]">
              <label className="font-medium text-lg">Email</label>
              <br />
              <input
                className="w-full border rounded-xl p-3 mt-1 mb-3"
                placeholder="Írja be az email címét"
                type="email"
                name="email"
                value={formatData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="px-5 text-left w-[400px]">
              <label className="font-medium text-lg">Jelszó</label>
              <br />
              <input
                className="w-full border rounded-xl p-3 mt-1 mb-3"
                placeholder="Írja be a felhasználó nevét"
                type="password"
                name="password"
                value={formatData.password}
                onChange={handleChange}
              />
            </div>
            <div className="px-5 text-left w-[400px]">
              <label className="font-medium text-lg">Jelszó újra</label>
              <br />
              <input
                className="w-full border rounded-xl p-3 mt-1 mb-3"
                placeholder="Írja be az email címét"
                type="password"
                name="passwordAgain"
                value={formatData.passwordAgain}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full p-5 mt-3">
            <button onClick={handleRegistration} className="w-full border-2 rounded-md p-3 font-bold bg-green-600 text-white text-lg border-gray-500 hover:text-gray-600 hover:bg-white hover:border-green-600">
              Regisztráció
            </button>
          </div>
          <div className="flex mt-3 px-5 justify-between">
            <p>Van már fiókod</p>
            <Link to="/logIn">
              <p className="hover:text-green-600 cursor-pointer">
                Bejelentkezés
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
