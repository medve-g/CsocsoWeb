import logo from "../../../public/logo.png";

export function Header(){
    return(
        <>
        {/* Header */}
        <div id="navbar"className="bg-green-600 h-20 text-white flex justify-between sticky">
                <div className="inline-block cursor-pointer h-auto"><img className="h-full" src={logo} alt="CsocsoLogo" /></div>
                <div className="p-5 flex items-center justify-around">
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Rólunk</div>
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Versenyek</div>
                    <div className="bg-black flex items-center w-fit h-fit p-3 mr-5 rounded-lg font-bold text-lg cursor-pointer">Profil</div>
                </div>
            </div>
        </>
    )
}

