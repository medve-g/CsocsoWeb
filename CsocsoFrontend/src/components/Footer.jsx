import { faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faEnvelope, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer() {
    return (
        <>
            <footer className="bg-[#16a34a] text-center text-white">
                <div class="mx-6 py-10 text-center md:text-left">
                    <div class="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-2 place-items-center">
                        <div class="">
                            <h6
                                class="mb-3 flex justify-center font-semibold uppercase md:justify-start text-xl">
                                Contact us
                            </h6>
                            <p class="mb-3 text-xl">
                                    <a href="#!"><FontAwesomeIcon icon={faHouse} /> 5600 Békéscsaba, Széchenyi utca 4</a>
                                </p>
                            <p class="mb-3">
                                <a href="#"><FontAwesomeIcon icon={faPhone} /> +36 30 395 6571</a>
                            </p>
                            <p class="mb-3">
                                <a href="#!"><FontAwesomeIcon icon={faEnvelope} /> viharsarkicse@gmail.com</a>
                            </p>
                        </div>
                        <div>
                            <h6
                                class="mb-3 flex justify-center font-semibold uppercase md:justify-start">
                                Média megjelenéseink
                            </h6>
                            <p class="mb-3">
                                <a href="https://www.facebook.com/viharsarkicse"><FontAwesomeIcon icon={faFacebook} /> Facebook</a>
                            </p>
                            <p class="mb-3">
                                <a href="https://www.instagram.com/viharsarkicsocsoegyesulet/"><FontAwesomeIcon icon={faLinkedin} /> Instagram</a>
                            </p>
                            <p class="mb-3">
                            <a href="https://www.youtube.com/playlist?list=PLBu4v_ZMPewVwk-MmSnFoneDCQfORzpTM"><FontAwesomeIcon icon={faYoutube} /> Youtube</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-black/5 p-6 text-center">
                   <a class="font-semibold">&copy; 2025 All rights reserved.</a>
                </div>


            </footer>
        </>
    )
}