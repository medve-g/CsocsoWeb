import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

export default function ContestRegistration() {
  const location = useLocation();
  const { contestInformation } = location.state || {};
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const enableRegisterButton = (user) => {
    if (!user || Object.keys(user).length === 0) return null;

    return (
      <button className="bg-green-500 rounded-md font-bold text-white text-medium p-3 border-1 hover:bg-green-600">
        Regisztráció
      </button>
    );
  };

  return (
    <>
      <div className="w-full flex justify-center items-center my-20">
        <div className="bg-white w-full max-w-[1000px] px-5 sm:px-10 py-10 sm:py-20 rounded-xl drop-shadow-lg mx-auto">
          <h1 className="mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-[45px] text-center font-semibold">
            {contestInformation?.competition_name}
          </h1>
          <p className="text-xl text-center py-3">
            <div className="font-bold">Helyszín:</div> 
            {contestInformation?.location}
          </p>
          <p className="text-xl text-center py-3">
            <div className="font-bold">Kezdés:</div> 
            {contestInformation?.competition_start}
          </p>
          <p className="text-xl text-center">
            <div className="font-bold">Előregisztráció lezáródása:</div> 
            {contestInformation?.end_of_pre_registration}
          </p>
          <div className="text-center mt-5">
            {enableRegisterButton(user)}
          </div>
        </div>
      </div>
    </>
  );
}
