import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import * as XLSX from "xlsx";

export default function ContestRegistration() {
  const location = useLocation();
  const { contestInformation } = location.state || {};
  const [user, setUser] = useContext(UserContext);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [searchTerms, setSearchTerms] = useState({});
  const [showDropdowns, setShowDropdowns] = useState({});
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

  const handleInputChange = (key, value) => {
    setSearchTerms((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        name: value, // Csak a név mezőt frissítjük
      },
    }));
    setShowDropdowns((prev) => ({ ...prev, [key]: true }));
  };

  const handleSelectPlayer = (
    key,
    playerName,
    playerCategory,
    playerPoints
  ) => {
    // Objektumot tárolunk el, nem csak a nevet
    const playerData = {
      name: playerName,
      rating: playerCategory,
      points: playerPoints,
    };

    setSearchTerms((prev) => ({ ...prev, [key]: playerData }));
    setShowDropdowns((prev) => ({ ...prev, [key]: false }));

    // Az objektum frissítése
    const updatedRegistration = { ...registration };
    if (key === `${key}_second`) {
      updatedRegistration.contestant2 = playerData;
    } else {
      updatedRegistration.contestant1 = playerData;
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
      categoryMap[category.name] = category.ranklist_reference;
    }

    return categoryMap;
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

  const gathereveryinfo = async () => {
    const categoryMap = await gatherSelectedCategories();
    const players = await fetchExcel(categoryMap);
    setAvailablePlayers(players); // most már objektum, nem tömb!
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    gathereveryinfo();
  }, []);

  const testRegistrationData = () => {
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
          registration_fee: null,
          competition_id: contestInformation.id,
        };
      });

    console.log("Beküldendő adatok:", selectedData);
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
              className="flex w-full min-h-[70px] border-green-400 border-2 my-5 items-center px-5 gap-10"
            >
              <div className="flex items-center gap-2 min-w-[200px]">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  value={value}
                  checked={!!selectedCategories[key]}
                  onChange={(e) => {
                    setSelectedCategories((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }));
                  }}
                />
                <p className="text-lg font-medium">{key}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex items-center gap-2">
                  <span className="text-sm font-medium">Játékos:</span>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Versenyző neve"
                      className="w-56 border-2 p-1 border-gray-500"
                      value={searchTerms[key]?.name || ""} // Csak a név legyen az input értéke
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      onFocus={() =>
                        setShowDropdowns((prev) => ({ ...prev, [key]: true }))
                      }
                    />
                    {showDropdowns[key] && searchTerms[key] && (
                      <div className="absolute top-full left-0 w-60 bg-white border border-gray-300 rounded max-h-60 overflow-y-auto z-10 shadow-md">
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
                  <div className="relative flex items-center gap-2">
                    <span className="text-sm font-medium">Partner:</span>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Versenyző neve"
                        className="w-56 border-2 p-1 border-gray-500"
                        value={searchTerms[`${key}_second`]?.name || ""} // Partner név
                        onChange={(e) =>
                          handleInputChange(`${key}_second`, e.target.value)
                        } // Használj különböző kulcsot
                        onFocus={() =>
                          setShowDropdowns((prev) => ({
                            ...prev,
                            [`${key}_second`]: true,
                          }))
                        }
                      />
                      {showDropdowns[`${key}_second`] &&
                        searchTerms[`${key}_second`] && (
                          <div className="absolute top-full left-0 w-60 bg-white border border-gray-300 rounded max-h-60 overflow-y-auto z-10 shadow-md">
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
                                      `${key}_second`, // Külön kulcs a partnerhez
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

        <button
          onClick={testRegistrationData}
          className="bg-green-500 rounded-md font-bold text-white text-medium p-3 border-1 hover:bg-green-600"
        >
          Regisztráció
        </button>
      </>
    );
  };

  return (
    <div className="w-full flex justify-center items-center my-20">
      <div className="bg-white w-full max-w-[1000px] px-5 sm:px-10 py-10 sm:py-20 rounded-xl drop-shadow-lg mx-auto">
        <h1 className="mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-[45px] text-center font-semibold">
          {contestInformation?.competition_name}
        </h1>
        <div className="text-xl text-center py-3">
          <div className="font-bold">Helyszín:</div>
          {contestInformation?.location}
        </div>
        <div className="text-xl text-center py-3">
          <div className="font-bold">Kezdés:</div>
          {contestInformation?.competition_start}
        </div>
        <div className="text-xl text-center">
          <div className="font-bold">Előregisztráció lezáródása:</div>
          {contestInformation?.end_of_pre_registration}
        </div>
        <div className="text-center mt-5">{enableRegisterButton(user)}</div>
      </div>
    </div>
  );
}
