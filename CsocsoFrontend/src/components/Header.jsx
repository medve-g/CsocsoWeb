import logo from "../../public/logo.png";
import { Link } from "react-router-dom"
import { UserContext } from "../App"
import { useState, useContext } from "react";



export function Header() {

    const [ user, setUser ] = useContext(UserContext);

    function toggleMobileMenu(menu) {
        menu.classList.toggle('open')
    }

    let enableLogOutBtn = (user) => {
        if (Object.keys(user).length == 0) {
            return <Link to="/login"><li>Bejelentkezés</li></Link>
        }else{
            return <li onClick={logOut}>Kijelentkezés</li>
        }
    }

    let logOut = () => {
        localStorage.removeItem("user");
        setUser({})
    }

    return (
        <>
            <header className="min-h-24 z-20">
                <div className="h-fit"><img className="h-24" src={logo}></img></div>
                <nav>
                    <ul>
                        <Link to="/"><li>Kezdőlap</li></Link>
                        <Link to="/contests"><li>Versenyek</li></Link>
                        <Link to="/aboutus"><li>Rólunk</li></Link>
                        {enableLogOutBtn(user)}
                    </ul>
                </nav>
                <div id="mobile-icon" onClick={(e) => toggleMobileMenu(e.currentTarget)}>
                    <div class='bar1'></div>
                    <div class='bar2'></div>
                    <div class='bar3'></div>
                    <ul class='mobile-menu'>
                        <Link to="/"><li>Kezdőlap</li></Link>
                        <Link to="/contests"><li>Versenyek</li></Link>
                        <Link to="/aboutus"><li>Rólunk</li></Link>
                        {enableLogOutBtn(user)}
                    </ul>
                </div>

            </header>
        </>
    )
}

