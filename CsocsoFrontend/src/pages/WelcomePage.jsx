import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import kep1 from "../../public/kep1.jpg";
import kep2 from "../../public/kep2.jpg";
import kep3 from "../../public/kep3.jpg";

import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import ImageSlider from "../components/ImageSlider.jsx";
import { NewsSlider } from "../components/NewsSlider.jsx";




export function WelcomePage() {

   

    return (
        <>
            <ImageSlider/>  

            {/* About */}
            <section id="About-Box"className="py-16 px-6 md:px-12 lg:px-24 text-green-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-green-700 mb-6">Viharsarki Csocsó Egyesület</h2>
                    <p className="text-lg leading-relaxed">
                    A Viharsarki Csocsó Egyesület 2023-ban alakult azzal a céllal, hogy a csocsót és más sportágakat népszerűsítse hazánkban, valamint a fiatalok számára újabb sportolási és közösségi lehetőséget teremtsen. Az egyesület elkötelezett a csocsó oktatás színvonalának emelése mellett, és célja, hogy a sportágat minél szélesebb körben megismertesse a fiatalsággal. A szervezet tartalmas szabadidős programokat kínál, versenyzési lehetőséget biztosít, és összefogja a sport iránt érdeklődő ifjúságot. Az alapító tagok tapasztalt, profi játékosok, akik évek óta aktív szereplői a hazai sportéletnek, és szenvedélyesen dolgoznak a csocsó hazai fejlődéséért.
                    </p>
                </div>
                <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg w-80 text-center hover:brightness-125 transition duration-300">
                        <h3 className="text-2xl font-semibold">Egyesületünk neve:</h3>
                        <p className="mt-3 text-green-200">
                            Viharsarki Csocsó Egyesület
                        </p>
                    </div>
                    <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg w-80 text-center hover:brightness-125 transition duration-300">
                        <h3 className="text-2xl font-semibold">Alapító tagok</h3>
                        <p className="mt-3 text-green-200">
                            Diós Norbert, Börcsök Szabolcs, Kósa György, Hegedűs Dániel, Cseresznyés Ferenc, Bencsik Tamás, Dénes Benedek
                        </p>
                    </div>
                    <div className="bg-green-400 text-white p-6 rounded-2xl shadow-lg w-80 text-center hover:brightness-125 transition duration-300">
                        <h3 className="text-2xl font-semibold">Alapításának éve</h3>
                        <p className="mt-3 text-green-200">
                            2023
                        </p>
                    </div>
                </div>
            </section>

            <NewsSlider/>


            
        


        </>
    );
}
