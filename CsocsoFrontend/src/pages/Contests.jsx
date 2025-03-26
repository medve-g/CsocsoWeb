import { useState } from "react";

// function setButton(ertek){
//   if (ertek == 1) {
//     return (
//       <div className="w-full flex justify-end">
//           <button className="bg-green-500 rounded-md font-bold text-white text-2xl p-3 border-2 hover:bg-white hover:border-green-500  hover:text-green-500">
//             Új verseny
//           </button>
//         </div>
//     )
//   }
//   else{
//     return (
//       <>

//       </>
//     )
//   }
// }

export function Contests() {

  let [skibidi, setSkibidi] = useState(2);
  return (
    <>
      <h2
        className="text-7xl font-bold text-white mb-20 text-center mt-16"
        style={{
          textShadow:
            "2px 2px 4px rgba(0, 0, 0, 0.6), -2px -2px 4px rgba(0, 0, 0, 0.6)",
        }}
      >
        Versenyek
      </h2>
      <div className="min-h-[700px] w-full px-16">
        <div className="w-full flex justify-end">
          <button className="bg-green-500 rounded-md font-bold text-white text-2xl p-3 border-2 hover:bg-white hover:border-green-500  hover:text-green-500">
            Új verseny
          </button>
        </div>
        <div className="bg-green-800 w-full h-[200px] my-10 flex flex-row cursor-pointer ransition-transform duration-200 ease-in-out hover:scale-105">
          <div className="w-32 h-full text-center flex flex-col justify-center">
            <p className="text-2xl font-bold text-white">22</p>
            <p className="text-xl font-normal text-white">AUG</p>
            <p className="text-xl font-light text-white">2025</p>
          </div>
          <div className="h-full bg-black min-w-[200px]">
            <img src="../../public/ContestImage.jpg" alt="Contest Image" />
          </div>
          <div className="w-full flex justify-between">
            <div className="p-10">
              <p className="font-extrabold text-4xl mb-2 text-white">
                Giga verseny
              </p>
              <p className="text-2xl text-white font-normal">
                Előregisztráció lezáródása: dátum helye
              </p>
              <p className="text-xl font-light text-white">
                Helyszín: helyszín helye
              </p>
            </div>
            <div className="flex w-fit justify-end p-10">
              <table className="border-collapse border border-white text-center">
                <thead>
                  <tr className="bg-emerald-900 text-white font-bold text-lg">
                    <th className="p-4 border border-white">Rookie</th>
                    <th className="p-4 border border-white">Semi Pro</th>
                    <th className="p-4 border border-white">Pro</th>
                    <th className="p-4 border border-white">Master</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-emerald-700 text-white font-light text-lg">
                    <td className="p-4 border border-white">2000 HUF</td>
                    <td className="p-4 border border-white">2500 HUF</td>
                    <td className="p-4 border border-white">3000 HUF</td>
                    <td className="p-4 border border-white">4000 HUF</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
