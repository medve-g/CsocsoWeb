import { useEffect } from "react";

export function AboutUs() {
    useEffect(() => {
        const scrollLinks = document.querySelectorAll('a[href^="#"]');

        scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navbarHeight = 64;
                    const scrollToPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: scrollToPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        return () => {
            scrollLinks.forEach(link => {
                link.removeEventListener('click', () => {});
            });
        };
    }, []);

    return (
        <>
            <div className="flex min-h-screen">
                <div className="w-64 bg-white opacity-90 text-green-700 p-6 pl-[5px] rounded-xl m-4 h-fit">
                    <div className="space-y-6 text-center">
                        <a href="#cel" className="block hover:text-green-400">Az egyesület célja</a>
                        <a href="#tevekenyseg" className="block hover:text-green-400">Tevékenységeink</a>
                        <a href="#tervek" className="block hover:text-green-400">Terveinkben</a>
                        <a href="#megjelenes" className="block hover:text-green-400">Megjelenési lehetőségek</a>
                        <a href="#felepites" className="block hover:text-green-400">Az egyesület felépítése</a>
                    </div>
                </div>

                <div className="flex-1 p-8 text-green-900 text-lg" style={{ scrollBehavior: 'smooth' }}>
                    <h2 className="text-4xl font-bold text-green-700 mb-10 text-center">Rólunk</h2>

                    <div className="mb-24">
                        <h3 id="cel" className="text-3xl font-bold text-green-700 mb-4 text-center scroll-mt-16">Az egyesület célja</h3>
                        <p>A csocsó és más sportágak hazai népszerűsítése, a csocsó oktatás színvonalának növelése, valamint a fiatalság körében való terjesztése, a fiatalok számára tartalmas szabadidő eltöltési lehetőség nyújtása, ifjúság tömörítése, versenyeztetése a csocsó sportágban. Az egyesület alapító tagjai a már évek óta a sportban résztvevő profi játékosok.</p>
                    </div>

                    <div className="mb-24">
                        <h3 id="tevekenyseg" className="text-3xl font-bold text-green-700 mb-4 text-center scroll-mt-16">Tevékenységeink</h3>
                        <p>Viharsarki Csocsó Liga, egy 2014-ben indult versenysorozat, amely 5-6 fordulót jelent évente Békéscsabai helyszínnel. Országos ranglistába beleszámító versenysorozat.<br/><br/>
                            Amatőr és profi edzések, heti rendszerességgel tartanak a tagok edzéseket maguknak, illetve a fiataloknak, vagy az amatőröknek is. Életkori megkötés nincs.<br/><br/>
                            Egyéb versenyek szervezése, amelyek fő célpontjai az amatőr játékosok, illetve a 14-18 éves korosztály. Ezek közül a versenyek közül kiemelkedik a Békéscsabai Városi Középiskolás Csocsóverseny, amelyet évente egy vagy két alkalommal szerveztünk meg eddig is, 2024-ben már a nyolcadik ilyen versenyre kerül majd sor. Ezeken a versenyeken az 50-120 középiskolás tanuló szokott részt venni. Többek között minden évben megrendezésre kerül a „Mikulás Csocsó Kupa” is, ahol a gyerekek mikulás csomagokért küzdenek meg egymással. Továbbá évente 4-6 alkalommal amatőr versenyeket is szervezünk<br/></p>
                    </div>

                    <div className="mb-24">
                        <h3 id="tervek" className="text-3xl font-bold text-green-700 mb-4 text-center scroll-mt-16">Terveinkben</h3>
                        <p>Terveinkben szerepel az edzések, a versenyek kibővítése.<br/>
                            Jelenleg 5 db Leonhart típusú versenyasztalt bérlünk. Illetve a Csabagyöngye Kulturális Központtól bérelhetünk egy saját helyet, ahol az asztalaink elhelyezésre kerültek. Itt lehet napi rendszerességgel játszani, gyakorolni.<br/><br/>
                            A lehetséges támogatásokból az asztalok, versenyeink fejlesztése az cél. A lehető legjobb körülmények megteremtése.<br/><br/>
                            Az edzéseken általában 8-12 gyermek szokott részt venni. Őket csoportokra osztjuk, hiszen a legtöbb esetben korban és fejlettségi szintben is máshol járnak.</p>
                    </div>

                    <div className="mb-24">
                        <h3 id="megjelenes" className="text-3xl font-bold text-green-700 mb-4 text-center scroll-mt-16">Megjelenési lehetőségeink</h3>
                        <p> - versenyeken molinók, rollup-ok, szórólapok<br/>
                            - mezeken, csocsóasztalokon<br/>
                            - közösségimédia felületeinken<br/><br/>
                            Ezeket a rendezvényeinken, versenyeinken rendszeresen használjuk, viseljük.</p>
                    </div>

                    <div className="mb-24">
                        <h3 id="felepites" className="text-3xl font-bold text-green-700 mb-4 text-center scroll-mt-16">Az egyesület felépítése</h3>
                        <p>Elnök: Knyihár János<br/><br/>
                            Alelnökök: Földi Zsolt és Szeverényi Dániel<br/><br/>
                            Alapítótagok: Diós Norbert, Börcsök Szabolcs, Kósa György, Hegedűs Dániel, Cseresznyés Ferenc, Bencsik Tamás, Dénes Benedek.<br/><br/>
                            Alapítás után érkező tagjaink: Futaki Dániel, Földi Nóra, Czombos Balázs, Gubucz Panna, Csizmadia Róbert, Verók Csaba, Gyuricza Tamás, Makai Márton, Sajben Mercédesz, Bónus Kristóf, Albert Ádám, Molcsán Szabolcs, Boldog Kristóf, Megyeri Petra.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
