import logo from "../../../public/logo.png";



export function Header(){

    function toggleMobileMenu(menu){
        menu.classList.toggle('open')
    
    }

    return(
        <>
        {/* Header */}
        <header>
            <div id="headerlogo"><img src={logo}></img></div>
            <nav>
                 <ul>
                    <li>Kezdőlap</li> 
                    <li>Versenyek</li>
                    <li>Rólunk</li>
                    <li>Profil</li>
                </ul>
            </nav>   
            <div id="mobile-icon" onClick={(e) => toggleMobileMenu(e.currentTarget)}>
                <div class='bar1'></div>
                <div class='bar2'></div>
                <div class='bar3'></div>
                <ul class='mobile-menu'>
                    <li>Kezdőlap</li> 
                    <li>Versenyek</li>
                    <li>Rólunk</li>
                    <li>Profil</li>
                </ul>
            </div>
           
        </header>
        </>
    )
}

