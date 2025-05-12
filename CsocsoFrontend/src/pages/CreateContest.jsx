import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateContest() {
  const navigate = useNavigate();
  let [newContestData, setNewContestData] = useState({
    competition_name: "",
    location: "",
    competition_start: "",
    end_of_pre_registration: "",
    ratings_and_fees: {
      rookie_junior: 0,
      rookie: 0,
      semi_pro_junior: 0,
      semi_pro: 0,
      pro: 0,
      master: 0,
    },
    categories: "",
  });

  const handleForm = async (e) => {
    e.preventDefault()
    const checkedRadios = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const selectedCategories = {};

    checkedRadios.forEach((radio) => {
      const category = radio.className;
      selectedCategories[category] = parseInt(radio.id);
    });

    const finalData = {
      ...newContestData,
      categories: selectedCategories,
    };

    let res = await fetch("http://127.0.0.1:8000/api/newContest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Valami hiba történt");
    }

    navigate("/contests");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewContestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingsAndFeesChange = (e) => {
    const { name, value } = e.target;

    setNewContestData((prev) => ({
      ...prev,
      ratings_and_fees: {
        ...prev.ratings_and_fees,
        [name]: parseInt(value),
      },
    }));
  };

  return (
    <div className="my-24">
      <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-green-600">
        <label className="block font-medium mb-1 ">Verseny neve:</label>
        <div>
          <input
            type="text"
            name="competition_name"
            value={newContestData.competition_name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
          />
        </div>

        <label className="block font-medium mb-1">Helyszín:</label>
        <div>
          <input
            type="text"
            name="location"
            value={newContestData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
          />
        </div>

        <label className="block font-medium mb-1">Verseny kezdete:</label>
        <div>
          <input
            type="datetime-local"
            name="competition_start"
            value={newContestData.competition_start}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
          />
        </div>

        <label className="block font-medium mb-1">Előregisztráció vége:</label>
        <div>
          <input
            type="datetime-local"
            name="end_of_pre_registration"
            value={newContestData.end_of_pre_registration}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
          />
        </div>

        <label className="block font-medium mb-1">Besorolás és díjak</label>
        <div className="space-y-4" id="ratings_and_fees">
          <div className="flex items-center space-x-2">
            <p className="w-40 text-sm text-green-700 m-0">Rookie (junior)</p>
            <input
              type="text"
              name="rookie_junior"
              value={newContestData.ratings_and_fees.rookie_junior}
              onChange={handleRatingsAndFeesChange}
              required
              className="feeInputField flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
            />
            Ft
          </div>

          <div className="flex items-center space-x-2">
            <p className="w-40 text-sm text-green-700 m-0">Rookie</p>
            <input
              type="text"
              name="rookie"
              value={newContestData.ratings_and_fees.rookie}
              onChange={handleRatingsAndFeesChange}
              required
              className="feeInputField flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
            />
            Ft
          </div>

          <div className="flex items-center space-x-2">
            <p className="w-40 text-sm text-green-700 m-0">Semi-pro (junior)</p>
            <input
              type="text"
              name="semi_pro_junior"
              value={newContestData.ratings_and_fees.semi_pro_junior}
              onChange={handleRatingsAndFeesChange}
              required
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
            />
            Ft
          </div>

          <div className="flex items-center space-x-2">
            <p className="w-40 text-sm text-green-700 m-0">Semi-pro</p>
            <input
              type="text"
              name="semi_pro"
              value={newContestData.ratings_and_fees.semi_pro}
              onChange={handleRatingsAndFeesChange}
              required
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
            />
            Ft
          </div>

          <div className="flex items-center space-x-2">
            <p className="w-40 text-sm text-green-700 m-0">Pro</p>
            <input
              type="text"
              name="pro"
              value={newContestData.ratings_and_fees.pro}
              onChange={handleRatingsAndFeesChange}
              required
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
            />
            Ft
          </div>

          <div className="flex items-center space-x-2">
            <p className="w-40 text-sm text-green-700 m-0">Master</p>
            <input
              type="text"
              name="master"
              value={newContestData.ratings_and_fees.master}
              onChange={handleRatingsAndFeesChange}
              required
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
            />
            Ft
          </div>
        </div>

        <label className="block font-medium mb-1 text-center">Kategóriák</label>
        <div className="flex justify-center gap-16">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="1" className="Nyílt Páros" />
              <label htmlFor="1">Nyílt Páros</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="2" className="Nyílt Egyéni" />
              <label htmlFor="2">Nyílt Egyéni</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="3" className="Semi_pro Páros" />
              <label htmlFor="3">Semi-pro Páros</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="4" className="Rookie Páros" />
              <label htmlFor="4">Rookie Páros</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="5" className="Vegyes Páros" />
              <label htmlFor="5">Vegyes Páros</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="6" className="Rookie Egyéni" />
              <label htmlFor="6">Rookie Egyéni</label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="7" className="Amatőr Páros" />
              <label htmlFor="7">Amatőr Páros</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="8" className="Női Páros" />
              <label htmlFor="8">Női Páros</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="9" className="Női Egyéni" />
              <label htmlFor="9">Női Egyéni</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="10" className="Junior Páros" />
              <label htmlFor="10">Junior Páros</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="11" className="Junior Egyéni" />
              <label htmlFor="11">Junior Egyéni</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="12" className="Sorsolásos Páros" />
              <label htmlFor="12">Sorsolásos Páros</label>
            </div>
          </div>
        </div>

        <button
          className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 transition block mx-auto"
          onClick={handleForm}
        >
          Beküldés
        </button>
      </form>
    </div>
  );
}
