import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContestCard({ contestInformation }) {
  const ratingsAndFees = contestInformation?.ratings_and_fees;
  const navigate = useNavigate();

  return (
  <div
  onClick={() => {
    navigate("/contestRegistration", { state: { contestInformation } });
  }}
  className="bg-green-800 w-full my-10 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105"
>
  <div className="flex flex-col lg:flex-row w-full min-h-[200px]">
    <div className="bg-black w-full lg:w-[200px] h-[150px] lg:h-auto flex items-center justify-center">
      <img
        src="../../public/ContestImage.jpg"
        alt="Contest Image"
        className="object-contain w-full h-full"
      />
    </div>

    <div className="w-full flex flex-col lg:flex-row justify-between gap-4 p-6">
      <div className="lg:pl-10 flex flex-col gap-2 break-words">
        <p className="font-extrabold text-2xl lg:text-4xl text-white">
          {contestInformation?.competition_name}
        </p>
        <p className="text-lg lg:text-2xl text-white font-normal">
          Előregisztráció lezáródása:{" "}
          {contestInformation?.["end_of_pre_registration"]}
        </p>
        <p className="text-lg lg:text-2xl text-white font-normal">
          Kezdés: {contestInformation?.["competition_start"]}
        </p>
        <p className="text-base lg:text-xl font-light text-white">
          Helyszín: {contestInformation?.location}
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full items-center justify-center">
        <div className="overflow-x-auto w-full max-w-4xl mx-auto">
          <table className="hidden lg:table border-collapse border border-white text-center">
            <thead>
              <tr className="bg-emerald-900 text-white font-bold text-lg">
                {ratingsAndFees &&
                  Object.entries(ratingsAndFees).map(([category]) => (
                    <th key={category} className="p-3 border border-white">
                      {category}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-emerald-700 text-white font-light text-lg">
                {ratingsAndFees &&
                  Object.entries(ratingsAndFees).map(([category, fee]) => (
                    <td key={category} className="px-3 border border-white">
                      {fee} HUF
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 lg:hidden w-full">
          {ratingsAndFees &&
            Object.entries(ratingsAndFees).map(([category, fee]) => (
              <div
                key={category}
                className="bg-emerald-700 border border-white text-white p-3 text-center"
              >
                <p className="font-bold text-lg">{category}</p>
                <p className="text-base">{fee} HUF</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
