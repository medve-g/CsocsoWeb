import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ContestCard from "../components/ContestCard";
import { UserContext } from "../App";

let enableButton = (user) => {


  if (user.contest_admin == 1) {
    return (
      <div className="w-full flex justify-end">
        <Link to="/createContest">
          <button className="bg-green-500 rounded-md font-bold text-white text-2xl p-3 border-2 hover:bg-white hover:border-green-500  hover:text-green-500">
            Új verseny
          </button>
        </Link>
      </div>
    );
  } else {
    return <></>;
  }
};

export function Contests() {
  let [contests, setContests] = useState([]);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    try {
      async function getAllContests() {
        let response = await fetch("http://127.0.0.1:8000/api/contests");
        let data = await response.json();
        setContests(data);
      }

      getAllContests();
    } catch (error) {
      console.error("Error while fetching data: ", error);
    }
  }, []);

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
        {enableButton(user)}

        {contests.map((contest) => {
          return (
            <ContestCard 
              key={contest.id}
              contestInformation={contest}
            ></ContestCard>
          );
        })}
      </div>
    </>
  );
}
