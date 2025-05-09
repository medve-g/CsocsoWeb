import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [errors, setErrors] = useState({});

  let [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    phonenumber: "",
    gender: "",
    contest_admin: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let handleRegistration = async () => {
    try {
      let res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      let responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.errors ? JSON.stringify(responseData.errors) : "Valami hiba történt");
      }

      localStorage.setItem("user", JSON.stringify(responseData));
      setUser(responseData);
      navigate("/");
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const inputValidation = (name, value) => {
    let errorMessage = "";

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        errorMessage = "Érvénytelen email formátum!";
      }
    }

    if (name === "phonenumber") {
      const phoneRegex = /^\+\d{11}$/;
      if (!phoneRegex.test(value)) {
        errorMessage = "Telefon formátum: +36703569587";
      }
    }

    if (name === "password") {
      if (value.length < 8) {
        errorMessage = "A jelszónak legalább 8 karakter hosszúnak kell lennie!";
      }
    }

    if (name === "password_confirmation") {
      if (value !== registrationData.password) {
        errorMessage = "A jelszavak nem egyeznek!";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };


  return (
    <div className="w-full flex justify-center items-center my-20">
      <div className="bg-white w-[1000px] max-w-full px-10 py-20 rounded-xl drop-shadow-lg sm:px-6 sm:py-10">
        <h1 className="mb-10 mx-5 text-[45px] text-center text-black font-semibold sm:text-[35px]">
          Regisztráció
        </h1>
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between mb-5 gap-5">
            <div className="px-5 text-left flex-1">
              <label className="font-medium text-lg">Felhasználónév</label>
              <br />
              <input
                className="w-full border rounded-xl p-3 mt-1 mb-3"
                placeholder="Írja be a felhasználó nevét"
                type="text"
                name="username"
                value={registrationData.username}
                onChange={handleChange}
              />

            </div>
            <div className="px-5 text-left flex-1">
              <label className="font-medium text-lg">Email</label>
              <br />
              <input
                className="w-full border rounded-xl p-3 mt-1 mb-3"
                placeholder="Írja be az email címét"
                type="email"
                name="email"
                value={registrationData.email}
                onChange={handleChange}
                onBlur={(e) => inputValidation(e.target.name, e.target.value)}
              />
              {errors.email && <small className="text-red-500">{errors.email}</small>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-5">
            <div className="px-5 text-left flex-1">
              <label className="font-medium text-lg">Jelszó</label>
              <br />
              <input
                className="w-full border rounded-xl p-3 mt-1 mb-3"
                placeholder="Írja be a jelszót"
                type="password"
                name="password"
                value={registrationData.password}
                onChange={handleChange}
                onBlur={(e) => inputValidation(e.target.name, e.target.value)}
              />
              {errors.password && <small className="text-red-500">{errors.password}</small>}
            </div>
            <div className="px-5 text-left flex-1">
              <label className="font-medium text-lg">Jelszó újra</label>
              <br />
              <input
                className="w-full border rounded-xl p-3 mt-1 mb-3"
                placeholder="Írja be a jelszót újra"
                type="password"
                name="password_confirmation"
                value={registrationData.password_confirmation}
                onChange={handleChange}
                onBlur={(e) => inputValidation(e.target.name, e.target.value)}
              />
              {errors.password_confirmation && <small className="text-red-500">{errors.password_confirmation}</small>}

            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-5">
            <div className="px-5 text-left flex-1">
              <label className="font-medium text-lg">Telefonszám</label>
              <br />
              <input
                className="w-full border rounded-xl p-3 mt-1 mb-3"
                placeholder="+36703569587"
                type="text"
                name="phonenumber"
                value={registrationData.phonenumber}
                onChange={handleChange}
                onBlur={(e) => inputValidation(e.target.name, e.target.value)}
              />
              {errors.phonenumber && <small className="text-red-500">{errors.phonenumber}</small>}
            </div>
            <div className="px-5 text-left flex-1">
              <label className="font-medium text-lg">Nem</label>
              <br />
              <select
                className="w-full border rounded-xl p-3 mt-1 mb-3"
                name="gender"
                value={registrationData.gender}
                onChange={handleChange}
                onBlur={(e) => inputValidation(e.target.name, e.target.value)}
              >
                <option value="" disabled selected>Válassza ki a nemét</option>
                <option value="Férfi">Férfi</option>
                <option value="Nő">Nő</option>
              </select>
            </div>
          </div>



          <div className="w-full px-5 mt-3">
            <button
              onClick={handleRegistration}
              className="w-full border-2 rounded-md p-3 font-bold bg-green-600 text-white text-lg border-gray-500 hover:text-gray-600 hover:bg-white hover:border-green-600"
            >
              Regisztráció
            </button>
          </div>

          <div className="flex mt-3 px-5 justify-between text-sm sm:text-base">
            <p>Van már fiókod?</p>
            <Link to="/logIn">
              <p className="hover:text-green-600 cursor-pointer">Bejelentkezés</p>
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}
