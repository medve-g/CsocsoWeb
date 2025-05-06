import { useEffect, useState } from "react";

export default function ContestCard({ contestInformation }) {
  const ratingsAndFees = contestInformation?.ratings_and_fees;

  return (
    <div className="bg-green-800 w-full h-[200px] my-10 flex flex-row cursor-pointer ransition-transform duration-200 ease-in-out hover:scale-105">
      <div className="h-full bg-black min-w-[200px]">
        <img src="../../public/ContestImage.jpg" alt="Contest Image" />
      </div>
      <div className="w-full flex justify-between">
        <div className="pl-10 py-6">
          <p className="font-extrabold text-4xl mb-2 text-white">
            {contestInformation?.competition_name}
          </p>
          <p className="text-2xl text-white font-normal">
            Előregisztráció lezáródása:{" "}
            {contestInformation?.["end_of_pre-registration"]}
          </p>
          <p className="text-2xl text-white font-normal">
            Kezdés: {contestInformation?.["end_of_pre-registration"]}
          </p>
          <p className="text-xl font-light text-white">
            Helyszín: {contestInformation?.location}
          </p>
        </div>
        <div className="flex w-fit justify-end p-8">
          <table className="border-collapse border border-white text-center">
            <thead>
              <tr className="bg-emerald-900 text-white font-bold text-lg">
                {ratingsAndFees &&
                  Object.entries(ratingsAndFees).map(([category, fee]) => {
                    if (category.includes("junior")) {
                      let attempt = category.split(" ");
                      return (
                        <th key={category} className="p-3 border border-white">
                          {attempt[0]}
                          <br />
                          {attempt[1]}
                        </th>
                      );
                    } else {
                      return (
                        <th key={category} className="p-3 border border-white">
                          {category}
                        </th>
                      );
                    }
                  })}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-emerald-700 text-white font-light text-lg">
                {ratingsAndFees &&
                  Object.entries(ratingsAndFees).map(([category, fee]) => {
                    return (
                      <td key={category} className="px-3 border border-white">
                        {fee} HUF
                      </td>
                    );
                  })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
