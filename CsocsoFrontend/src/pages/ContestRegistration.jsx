import { PrefetchPageLinks, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import * as XLSX from "xlsx";

export default function ContestRegistration() {
  const location = useLocation();
  const { contestInformation } = location.state || {};
  const [user, setUser] = useContext(UserContext);
  const [registrationData, setRegistrationData] = useState([]);
  const [categorieReferencesForSpreadsheet, setCategorieReferencesForSpreadsheet] = useState([]);

  let registrationTester = () => {
    const checkedCategories = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    checkedCategories.forEach((singleCategorie) => {
      let temporaryRegistrationData = {
        registration_submitter: user.id,
        categorie: singleCategorie.value
      }
    });

    gatherSelectedCategories()
  }


  let gatherSelectedCategories = async () => {
    let res = await fetch("http://127.0.0.1:8000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contestInformation.categories),
    })
    let data = await res.json()
    setCategorieReferencesForSpreadsheet(data)
  }

  

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    
    async function fetchExcel() {
      let res = await fetch(`https://docs.google.com/spreadsheets/d/1XSWVXtvboY8Rr8sIP0QtDjju4W1fa20u/export?format=xlsx`)
      let arrayBuffer = await res.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      for (let i = 0; i < 5; i++) {
        const sheetName = workbook.SheetNames[i];
        const worksheet = workbook.Sheets[sheetName];
      }
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
    }

    async function getherActualCategories() {
      let res = fetch()
    }

    //fetchExcel();
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
                <input className="w-4 h-4" type="checkbox" value={value}/>
                <p className="text-lg">{key}</p>
              </div>
              <div className="flex justify-center items-center gap-2 text-center px-5">
                <p className="text-lg">Játékos: </p>
                <select name="playersFromRanklist" id="playersFromRanklist">

                </select>
              </div>
            </div>
          );
        })}
        <button onClick={registrationTester} className="bg-green-500 rounded-md font-bold text-white text-medium p-3 border-1 hover:bg-green-600">
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
