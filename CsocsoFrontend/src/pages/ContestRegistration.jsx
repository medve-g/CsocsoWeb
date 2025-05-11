import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../App";
import * as XLSX from "xlsx";

export default function ContestRegistration() {
  const location = useLocation();
  const { contestInformation } = location.state || {};
  const [user, setUser] = useContext(UserContext);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [searchTerms, setSearchTerms] = useState({});
  const [showDropdowns, setShowDropdowns] = useState({});

  const handleInputChange = (key, value) => {
    setSearchTerms((prev) => ({ ...prev, [key]: value }));
    setShowDropdowns((prev) => ({ ...prev, [key]: true }));
  };

  const handleSelectPlayer = (key, playerName) => {
    setSearchTerms((prev) => ({ ...prev, [key]: playerName }));
    setShowDropdowns((prev) => ({ ...prev, [key]: false }));
  };

  const gatherSelectedCategories = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contestInformation.categories),
    });

    const data = await res.json();

    let uniqueReferences = [];
    let seen = [];

    for (let i = 0; i < data.length; i++) {
      if (!seen.includes(data[i].ranklist_reference)) {
        uniqueReferences.push(data[i].ranklist_reference);
        seen.push(data[i].ranklist_reference);
      }
    }

    return uniqueReferences;
  };

  const fetchExcel = async (sheetNames) => {
    const res = await fetch(
      `https://docs.google.com/spreadsheets/d/1XSWVXtvboY8Rr8sIP0QtDjju4W1fa20u/export?format=xlsx`
    );
    const arrayBuffer = await res.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const activePlayers = [];

    sheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      if (!worksheet) return;

      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const filtered = jsonData.filter((row) => row["Inaktív?"] === undefined);
      activePlayers.push(...filtered);
    });

    return activePlayers;
  };

  const gathereveryinfo = async () => {
    const sheetNames = await gatherSelectedCategories();
    if (sheetNames.length > 0) {
      const players = await fetchExcel(sheetNames);
      setAvailablePlayers(players);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    gathereveryinfo();
  }, []);

  const enableRegisterButton = (user) => {
    if (!user || Object.keys(user).length === 0) return null;

    return (
      <>
        {Object.entries(contestInformation.categories).map(([key, value]) => {
          return (
            <div
              key={key}
              className="flex w-full h-[50px] border-green-400 border-2 my-5"
            >
              <div className="flex justify-center items-center gap-2 text-center px-5">
                <input className="w-4 h-4" type="checkbox" value={value} />
                <p className="text-lg">{key}</p>
              </div>
              <div className="flex justify-center items-center gap-2 text-center px-5">
                <p className="text-lg">Játékos: </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Versenyző neve"
                    className="w-40 border-2 p-1 border-gray-500"
                    value={searchTerms[key] || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    onFocus={() =>
                      setShowDropdowns((prev) => ({ ...prev, [key]: true }))
                    }
                  />

                  {showDropdowns[key] && searchTerms[key] && (
                    <div className="absolute top-full left-0 w-40 bg-white border border-gray-300 rounded max-h-60 overflow-y-auto z-10 shadow-md">
                      {availablePlayers
                        .filter((player) =>
                          player?.Név?.toLowerCase().includes(
                            searchTerms[key].toLowerCase()
                          )
                        )
                        .map((player, idx) => (
                          <div
                            key={idx}
                            className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                            onClick={() => handleSelectPlayer(key, player.Név)}
                          >
                            {player.Név}
                          </div>
                        ))}
                    </div>
                  )}

                  
                </div>
              </div>
            </div>
          );
        })}
        <button className="bg-green-500 rounded-md font-bold text-white text-medium p-3 border-1 hover:bg-green-600">
          Regisztráció
        </button>
      </>
    );
  };

  return (
    <>
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
    </>
  );
}
