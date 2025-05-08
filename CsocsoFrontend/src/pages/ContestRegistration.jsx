import { useEffect, useState } from "react"

export default function ContestRegistration(){
    let [selectedCompetitionData, setSelectedCompetitionData] = useState({});

    useEffect(()=> {
        async function getSelectedCompetitionData() {
            let contestId = localStorage.getItem("currentCompetition");
            let res = await fetch(`http://127.0.0.1:8000/api/getContestData/${contestId}`)
            let currentCompetition = await res.json();

            setSelectedCompetitionData(currentCompetition.data)
        }

        getSelectedCompetitionData();
    },[])


    return( 
            <div className="w-full flex justify-center my-20">
                <div className="bg-white w-[1000px] rounded-xl drop-shadow-lg py-10">
                    <h1 className="text-center">
                        {selectedCompetitionData.competition_name}
                    </h1>
                </div>
            </div>
    )
}