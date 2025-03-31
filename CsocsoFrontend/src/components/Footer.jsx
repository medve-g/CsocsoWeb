import { faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer() {
    return (
        <>
            <footer className="h-32 ">
                <div className="h-32" id="copyright">
                    <p className="text-left text-2xl">Contact us</p>
                    <div class="flex justify-right space-y-10 space-x-10 text-xl text-white">
                        <a href="#"><FontAwesomeIcon icon={faPhone} />+3620123456789</a>
                    </div>
                    <div class="flex justify-center space-x-10 text-2xl text-white">
                        <a href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Fviharsarkicse%2F"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href=""><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a href="https://www.youtube.com/playlist?list=PLBu4v_ZMPewVwk-MmSnFoneDCQfORzpTM"><FontAwesomeIcon icon={faYoutube} /></a>
                    </div>
                    &copy; 2025 All rights reserved.
                </div>
            </footer>
        </>
    )
}