import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useState, useContext, useEffect } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Nevezés törlés popup
  const [errors, setErrors] = useState({});
  const [userRegistrations, setUserRegistrations] = useState([]); // Nevezések tárolása
  const [currentRegistrationId, setCurrentRegistrationId] = useState(null); // Törölni kívánt nevezés ID-ja

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    fetchUserRegistrations(); // Nevezések betöltése az API-ból
  }, []);

  const logOut = () => {
    localStorage.removeItem("user");
    setUser({});
    navigate("/");
  };

  const inputValidation = (name, value) => {
    let errorMessage = "";

    if (name === "new_password" && value.length < 8) {
      errorMessage =
        "Az új jelszónak legalább 8 karakter hosszúnak kell lennie!";
    }

    if (
      name === "new_password_confirmation" &&
      value !== passwordchangeData.new_password
    ) {
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
    new_password_confirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setpasswordchangeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Nevezések betöltése
  const fetchUserRegistrations = async () => {
    let res = await fetch(
      `http://127.0.0.1:8000/api/useRregistrationGetter/${user.id}`
    );
    let data = await res.json();
    setUserRegistrations(data); // Állapot frissítése
  };

  // Nevezés törlése
  const deleteCurrentRegister = async () => {
    if (!currentRegistrationId) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/deleteRegister/${currentRegistrationId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        console.log("Sikeres törlés:", data.message);

        // Törölt nevezés eltávolítása az állapotból
        setUserRegistrations((prev) =>
          prev.filter((item) => item.id !== currentRegistrationId)
        );
        setShowDeletePopup(false); // Bezárjuk a törlés megerősítő pop-upot
      } else {
        console.error("Hiba történt:", data.message);
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
  };

  // Jelszó módosítása
  const handleChangePassword = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/changePassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(passwordchangeData),
        }
      );

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
              <div className="text-gray-700">{user?.email}</div>
            </div>
          </div>

          <div className="px-6 py-6 flex items-center justify-between bg-gray-100 rounded-lg">
            <div className="flex gap-x-4 items-center flex-1">
              <label className="font-semibold text-lg">Telefonszám:</label>
              <div className="text-gray-700">{user?.phonenumber}</div>
            </div>
          </div>

          <div className="px-6 py-6 flex items-center justify-between bg-gray-100 rounded-lg">
            <div className="flex gap-x-4 items-center flex-1">
              <label className="font-semibold text-lg">Nem:</label>
              <div className="text-gray-700">{user?.gender}</div>
            </div>
          </div>

          <div className="text-right">
            <button
              className="bg-green-500 rounded-md font-bold text-white text-sm px-4 py-2 border hover:bg-green-600"
              onClick={() => navigate("/profiledatachange")}
            >
              Adatok módosítása
            </button>
          </div>
        </div>

        {userRegistrations.length == 0 ? (
          <div className="px-6 pt-5 text-center w-full">
            <label className="font-semibold text-lg">Eddigi nevezéseim:</label>
            <p className="text-gray-600">Jelenleg nincs nevezésed.</p>
          </div>
        ) : (
          <div className="px-4 sm:px-6 pt-5 text-center w-full flex flex-col items-center">
            <p className="font-semibold text-md mb-4">Eddigi nevezéseim:</p>
            {userRegistrations.map((element) => {
              const contestant1 = JSON.parse(element.contestant1);
              const contestant2 = element.contestant2 !== "null" ? JSON.parse(element.contestant2) : null;

              return (
                <div
                  className="w-full max-w-4xl border-2 border-green-500 my-3 p-4 text-base sm:text-lg flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center text-left break-words flex-wrap"
                  key={element.id}
                >
                  <div className="flex-1">
                    <strong>Verseny:</strong> {element.competition_name}
                  </div>
                  <div className="flex-1">
                    <strong>Kategória:</strong> {element.category_name}
                  </div>
                  <div className="flex-1">
                    <strong>Versenyző:</strong> {contestant1.name}
                  </div>
                  {contestant2 && (
                    <div className="flex-1">
                      <strong>Partner:</strong> {contestant2.name}
                    </div>
                  )}
                  <div className="w-full sm:w-auto flex justify-start sm:justify-end mt-2 sm:mt-0">
                    <button
                      onClick={() => {
                        setCurrentRegistrationId(element.id);
                        setShowDeletePopup(true);
                      }}
                      className="bg-red-500 rounded-md font-bold text-white px-4 py-2 hover:bg-red-600 self-start sm:self-auto w-full sm:w-auto"
                    >
                      Törlés
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between mt-10 w-full">
          <button
            className="bg-green-500 rounded-md font-bold text-white text-lg sm:text-xl px-6 py-3 w-full sm:w-auto hover:bg-green-600"
            onClick={() => setShowPopup(true)}
          >
            Jelszó megváltoztatása
          </button>

          <button
            className="bg-red-500 rounded-md font-bold text-white text-lg sm:text-xl px-6 py-3 w-full sm:w-auto hover:bg-red-600"
            onClick={logOut}
          >
            Kijelentkezés
          </button>
        </div>
      </div>

      {/* Jelszó módosító popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Jelszó módosítása</h2>

            <label className="block text-gray-700 font-semibold mb-2">
              Jelenlegi jelszó:
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg mb-4"
              name="current_password"
              value={passwordchangeData.current_password}
              onChange={handleChange}
              onBlur={(e) => inputValidation(e.target.name, e.target.value)}
            />
            {errors.current_password && (
              <small className="text-red-500">{errors.current_password}</small>
            )}

            <label className="block text-gray-700 font-semibold mb-2">
              Új jelszó:
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg mb-4"
              name="new_password"
              value={passwordchangeData.new_password}
              onChange={handleChange}
              onBlur={(e) => inputValidation(e.target.name, e.target.value)}
            />
            {errors.new_password && (
              <small className="text-red-500">{errors.new_password}</small>
            )}

            <label className="block text-gray-700 font-semibold mb-2">
              Új jelszó megerősítése:
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg mb-4"
              name="new_password_confirmation"
              value={passwordchangeData.new_password_confirmation}
              onChange={handleChange}
              onBlur={(e) => inputValidation(e.target.name, e.target.value)}
            />
            {errors.new_password_confirmation && (
              <small className="text-red-500">
                {errors.new_password_confirmation}
              </small>
            )}

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => {
                  setShowPopup(false);
                  setpasswordchangeData({
                    current_password: "",
                    new_password: "",
                    new_password_confirmation: "",
                  });
                  setErrors({});
                }}
              >
                Mégse
              </button>

              <button
                className={`px-4 py-2 rounded-md ${isFormValid()
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-400 cursor-not-allowed text-gray-700"
                  }`}
                onClick={handleChangePassword}
                disabled={!isFormValid()}
              >
                Mentés
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nevezés törlésének megerősítése popup */}
      {showDeletePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Nevezés törlése</h2>
            <p>Biztosan törölni szeretnéd a nevezést?</p>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setShowDeletePopup(false)}
              >
                Mégse
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={deleteCurrentRegister}
              >
                Törlés
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
