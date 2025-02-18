export function WelcomePage() {
    return(
        <>
            {/*Header*/}
            <div className="p-5 bg-green-500 h-36 text-white flex justify-between">
                <div className="bg-black flex items-center w-fit h-fit p-9 cursor-pointer">Logo</div>
                <div className="flex items-center justify-around">
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Rólunk</div>
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Versenyek</div>
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Profil</div>
                </div>
            </div>

            {/*Slider*/}
            <div className="w-full h-[450px]">
            <div><img src=""/></div>
            <div><img src=""/></div>
            <div><img src=""/></div>
            <div><img src=""/></div>
            <div><img src=""/></div>
            </div>
        </>
    )
}