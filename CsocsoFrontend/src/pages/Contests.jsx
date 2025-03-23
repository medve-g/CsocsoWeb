export function Contests() {
  return (
    <>
      <h2 className="text-7xl font-bold text-green-700 mb-6 text-center mt-5">
        Versenyek
      </h2>
      <div className="min-h-[700px] w-full">
        <div className="bg-red-400 h-[200px] mx-20 my-10 flex flex-row cursor-pointer ransition-transform duration-200 ease-in-out hover:scale-105">
          <div className="w-32 h-full text-center flex flex-col justify-center">
            <p className="text-2xl font-bold text-white">22</p>
            <p className="text-xl font-normal text-white">AUG</p>
            <p className="text-xl font-light text-white">2025</p>
          </div>
          <div className="h-full bg-black w-[200px]">
            <img src="../../public/ContestImage.jpg" alt="Contest Image" />
          </div>
          <div className="p-10">
            <p className="font-extrabold text-4xl text-white">Giga verseny</p>
            <p className="text-2xl text-white">Előregisztráció lezáródása: dátum helye</p>
          </div>
        </div>
        <div className="bg-red-400 h-[200px] mx-20 my-10 flex flex-row cursor-pointer ransition-transform duration-200 ease-in-out hover:scale-105">
          <div className="w-32 h-full text-center flex flex-col justify-center">
            <p className="text-2xl font-bold text-white">22</p>
            <p className="text-xl font-normal text-white">AUG</p>
            <p className="text-xl font-light text-white">2025</p>
          </div>
          <div className="h-full bg-black w-[200px]">
            <img src="../../public/ContestImage.jpg" alt="Contest Image" />
          </div>
          <div className="p-10">
            <p className="font-extrabold text-4xl text-white">Giga verseny</p>
            <p className="text-2xl text-white">Előregisztráció lezáródása: dátum helye</p>
          </div>
        </div>
      </div>
    </>
  );
}
