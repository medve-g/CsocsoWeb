import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import * as XLSX from "xlsx";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";

export default function ContestRegistration() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPreRegistrationBeforeDeadline, setIsPreRegistrationBeforeDeadline] =
    useState(true);
  const { contestInformation } = location.state || {};
  const [user, setUser] = useContext(UserContext);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [searchTerms, setSearchTerms] = useState({});
  const [showDropdowns, setShowDropdowns] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState({});
  const [registration, setRegistration] = useState({
    registration_submitter: user.id,
    categorie: null,
    contestant1: {
      name: null,
      rating: null,
      points: null,
    },
    contestant2: {
      name: null,
      rating: null,
      points: null,
    },
    registration_fee: null,
    competition_id: contestInformation.id,
  });

  const [showPopup, setShowPopup] = useState(false);

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

  const handleInputChange = (key, value) => {
    setSearchTerms((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        name: value,
      },
    }));
  };

  const handleFocus = (key) => {
    setShowDropdowns((prev) => ({ ...prev, [key]: true }));
  };

  const handleBlur = (key) => {
    setTimeout(() => {
      setShowDropdowns((prev) => ({ ...prev, [key]: false }));
    }, 200);
  };

  const handleSelectPlayer = (
    key,
    playerName,
    playerCategory,
    playerPoints
  ) => {
    const playerData = {
      name: playerName,
      rating: playerCategory,
      points: playerPoints,
    };

    setSearchTerms((prev) => ({ ...prev, [key]: playerData }));
    setShowDropdowns((prev) => ({ ...prev, [key]: false }));

    const updatedRegistration = { ...registration };

    if (key === `${key}_second`) {
      updatedRegistration.contestant2 = playerData;
    } else {
      updatedRegistration.contestant1 = playerData;
    }

    const firstContestantCategory = updatedRegistration.contestant1?.rating;

    if (firstContestantCategory) {
      const fee = contestInformation.ratings_and_fees[firstContestantCategory];
      updatedRegistration.registration_fee = fee ?? null;
    }

    setRegistration(updatedRegistration);
  };

  const gatherSelectedCategories = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contestInformation.categories),
    });

    const data = await res.json();

    const categoryMap = {};

    for (const category of data) {
      if (!categoryMap.hasOwnProperty(category.name)) {
        categoryMap[category.name] = category.ranklist_reference;
      }
    }

    return categoryMap;
  };

  const downloadExcel = async () => {
    let id = contestInformation.id;
    try {
      const response = await fetch(`/api/registration/export/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "registrations.xlsx";
      link.click();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const fetchExcel = async (categoryMap) => {
    const res = await fetch(
      `https://docs.google.com/spreadsheets/d/1XSWVXtvboY8Rr8sIP0QtDjju4W1fa20u/export?format=xlsx`
    );
    const arrayBuffer = await res.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const playersByCategory = {};

    for (const [categoryName, sheetName] of Object.entries(categoryMap)) {
      const worksheet = workbook.Sheets[sheetName];
      if (!worksheet) continue;

      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const filtered = jsonData.filter((row) => row["Inaktív?"] === undefined);
      playersByCategory[categoryName] = filtered;
    }

    return playersByCategory;
  };

  let deleteCurrentContest = async () => {
    let currentContextId = contestInformation.id;
    let res = await fetch(
      `http://127.0.0.1:8000/api/deleteContest/${currentContextId}`,
      {
        method: "DELETE",
      }
    );
    let data = await res.json();

    if (res.ok) {
      console.log(data.message);
      navigate("/contests");
    } else {
      console.log(data.message);
    }
  };

  const gathereveryinfo = async () => {
    const categoryMap = await gatherSelectedCategories();
    const players = await fetchExcel(categoryMap);
    setAvailablePlayers(players);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    gathereveryinfo();

    function checkIfPreRegistrationEnded() {
      const now = new Date();
      const target = new Date(contestInformation.end_of_pre_registration);
      if (now.getTime() > target.getTime()) {
        setIsPreRegistrationBeforeDeadline(false);
        return () => clearInterval(masodpercenkentiEllenorzes);
      }
    }
    checkIfPreRegistrationEnded();
    let masodpercenkentiEllenorzes = setInterval(
      checkIfPreRegistrationEnded,
      1000
    );

    return () => clearInterval(masodpercenkentiEllenorzes);
  }, []);

  const testRegistrationData = async () => {
    const selectedData = Object.entries(selectedCategories)
      .filter(([_, isChecked]) => isChecked)
      .map(([key, value]) => {
        const contestant1 = searchTerms[key] || null;
        const contestant2 = searchTerms[`${key}_second`] || null;

        return {
          registration_submitter: user.id,
          categorie: parseInt(value),
          contestant1,
          contestant2,
          registration_fee: registration.registration_fee,
          competition_id: contestInformation.id,
        };
      });
    console.log(selectedData);
    let res = await fetch("http://127.0.0.1:8000/api/registrationSender", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedData),
    });
    let data = await res.json();

    if (!res.ok) {
      setErrorMessage(data.message);
    }

    if (res.status == 201) {
      navigate("/contests");
    }
  };

  const enableRegisterButton = (user) => {
    if (!user || Object.keys(user).length === 0) return null;

    return (
      <>
        {Object.entries(contestInformation.categories).map(([key, value]) => {
          const isDoubles = key.toLowerCase().includes("páros");

          return (
            <div
              key={key}
              className="flex flex-col sm:flex-row w-full border-green-400 border-2 my-5 items-start sm:items-center px-4 py-4 gap-4 sm:gap-10 rounded-md"
            >
              <div className="flex items-center gap-2 min-w-[180px]">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  value={value}
                  checked={!!selectedCategories[key]}
                  onChange={(e) =>
                    setSelectedCategories((prev) => ({
                      ...prev,
                      [key]: e.target.checked ? e.target.value : undefined,
                    }))
                  }
                />
                <p className="text-base sm:text-lg font-medium break-words">
                  {key}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:flex-wrap">
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto sm:max-w-[350px]">
                  <span className="text-sm font-medium whitespace-nowrap">
                    Játékos:
                  </span>
                  <div className="relative w-full sm:w-56">
                    <input
                      type="text"
                      placeholder="Versenyző neve"
                      className="w-full border-2 p-1 border-gray-500"
                      value={searchTerms[key]?.name || ""}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      onFocus={() => handleFocus(key)}
                      onBlur={() => handleBlur(key)}
                    />
                    {showDropdowns[key] && searchTerms[key] && (
                      <div className="absolute top-full left-0 w-full sm:w-60 bg-white border border-gray-300 rounded max-h-60 overflow-y-auto z-10 shadow-md">
                        {availablePlayers[key]
                          ?.filter((player) =>
                            player?.Név?.toLowerCase().includes(
                              searchTerms[key]?.name?.toLowerCase()
                            )
                          )
                          .map((player, idx) => (
                            <div
                              key={idx}
                              className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                              onClick={() =>
                                handleSelectPlayer(
                                  key,
                                  player.Név,
                                  player["Besorolás"] || "Nincs besorolás",
                                  player["Össz pontszám"] || "Nincs pontszám"
                                )
                              }
                            >
                              <div className="font-semibold">{player.Név}</div>
                              <div className="text-sm text-gray-600">
                                {player["Besorolás"] || "Nincs besorolás"} |{" "}
                                {player["Össz pontszám"] !== undefined
                                  ? `${player["Össz pontszám"]} pont`
                                  : "Nincs pontszám"}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {isDoubles && (
                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto sm:max-w-[350px]">
                    <span className="text-sm font-medium whitespace-nowrap">
                      Partner:
                    </span>
                    <div className="relative w-full sm:w-56">
                      <input
                        type="text"
                        placeholder="Versenyző neve"
                        className="w-full border-2 p-1 border-gray-500"
                        value={searchTerms[`${key}_second`]?.name || ""}
                        onChange={(e) =>
                          handleInputChange(`${key}_second`, e.target.value)
                        }
                        onFocus={() => handleFocus(`${key}_second`)}
                        onBlur={() => handleBlur(`${key}_second`)}
                      />
                      {showDropdowns[`${key}_second`] &&
                        searchTerms[`${key}_second`] && (
                          <div className="absolute top-full left-0 w-full sm:w-60 bg-white border border-gray-300 rounded max-h-60 overflow-y-auto z-10 shadow-md">
                            {availablePlayers[key]
                              ?.filter((player) =>
                                player?.Név?.toLowerCase().includes(
                                  searchTerms[
                                    `${key}_second`
                                  ]?.name?.toLowerCase()
                                )
                              )
                              .map((player, idx) => (
                                <div
                                  key={idx}
                                  className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                  onClick={() =>
                                    handleSelectPlayer(
                                      `${key}_second`,
                                      player.Név,
                                      player["Besorolás"] || "Nincs besorolás",
                                      player["Össz pontszám"] ||
                                        "Nincs pontszám"
                                    )
                                  }
                                >
                                  <div className="font-semibold">
                                    {player.Név}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {player["Besorolás"] || "Nincs besorolás"} |{" "}
                                    {player["Össz pontszám"] !== undefined
                                      ? `${player["Össz pontszám"]} pont`
                                      : "Nincs pontszám"}
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {displayError(errorMessage)}
        <div className="w-full flex justify-center mt-8 gap-4 flex-col sm:flex-row">
          {isPreRegistrationBeforeDeadline && (
            <button
              onClick={testRegistrationData}
              className="bg-green-500 rounded-md font-bold text-white text-base sm:text-lg p-3 hover:bg-green-600"
            >
              Regisztráció
            </button>
          )}

          {Boolean(user?.contest_admin) && (
            <div className="gap-4 flex flex-col sm:flex-row">
              <button
                onClick={() => setShowPopup(true)} 
                className="bg-red-500 rounded-md font-bold text-white text-base sm:text-lg p-3 hover:bg-red-600"
              >
                Verseny Törlése
              </button>
              <button
                onClick={downloadExcel}
                className="bg-gray-500 rounded-md font-bold text-white text-base sm:text-lg p-3 hover:bg-gray-600"
              >
                Excel letöltése
              </button>
            </div>
          )}
        </div>
      </>
    );
  };


  const ShowPopup = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">
            Biztos, hogy törölni szeretnéd a versenyt?
          </h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setShowPopup(false);
                deleteCurrentContest();
              }}
              className="bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Igen
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
            >
              Mégsem
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-8 my-10 sm:my-20">
      <div className="bg-white w-full max-w-[1000px] px-5 sm:px-10 py-8 sm:py-16 rounded-xl drop-shadow-lg mx-auto">
        <h1 className="mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-[45px] text-center font-semibold leading-tight">
          {contestInformation?.competition_name}
        </h1>

        <div className="text-base sm:text-lg md:text-xl text-center py-2 sm:py-3">
          <div className="font-bold">Helyszín:</div>
          <div>{contestInformation?.location}</div>
        </div>

        <div className="text-base sm:text-lg md:text-xl text-center py-2 sm:py-3">
          <div className="font-bold">Kezdés:</div>
          <div>{contestInformation?.competition_start}</div>
        </div>

        <div className="text-base sm:text-lg md:text-xl text-center py-2 sm:py-3">
          <div className="font-bold">Előregisztrációhatárideje:</div>
          <div>{contestInformation?.end_of_pre_registration}</div>
        </div>

        {showPopup && <ShowPopup />}

        <div className="text-center mt-6 sm:mt-10">
          {enableRegisterButton(user)}
        </div>
      </div>
    </div>
  );
}
