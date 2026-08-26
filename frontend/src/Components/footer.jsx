
function footer(){
    return (
        <footer className=" w-full">
            <nav className="bg-sky-950 p-6 text-white">
                <div className="flex flex-wrap justify-around gap-8">
                    <div>
                        <h3 className="font-bold mb-2">USEFUL LINKS</h3>
                        <ul className="space-y-1">
                            <li><a href="/about" className="hover:text-sky-300">About Us</a></li>
                            <li><a href="/contact" className="hover:text-sky-300">Contact</a></li>
                            <li><a href="/privacy" className="hover:text-sky-300">Privacy Policy</a></li>
                            <li><a href="/termService" className="hover:text-sky-300">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">SUPPORT</h3>
                        <ul className="space-y-1">
                            <li><a href="/help" className="hover:text-sky-300">Help Center</a></li>
                            <li><a href="/faq" className="hover:text-sky-300">FAQ</a></li>
                            <li>
                                <a href="/contact" className="hover:text-sky-300">Report a Problem</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">ADDRESS</h3>
                        <ul className="space-y-1">
                            <li>123 Main St</li>
                            <li>Man Haton, UP, 025208</li>
                            <li>India</li>
                            <li>(123) 456-7890</li>
                        </ul>
                    </div>

                    <div>
                        <img src="/home-gif.gif" alt="Logo" className="h-20 rounded-md" />
                    </div>


                    <div className="text-center">
                        <h3 className="font-bold mb-2">LEGAL</h3>
                        <ul className="space-y-1">
                            <li>Copyright &copy; 2025</li>
                            <li>Homiee</li>
                            <li>All rights reserved</li>
                        </ul>
                    </div>
                </div>

                <div className="flex gap-2 items-center mt-10 justify-center space-x-4">
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                        <img src="/google-symbol.png" alt="Google" className="h-8 w-8 hover:opacity-80"/>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/instagram.png" alt="Instagram" className="h-8 w-8 hover:opacity-80"/>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="/facebook.png" alt="Facebook" className="h-8 w-8 hover:opacity-80"/>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="/twitter.png" alt="Twitter" className="h-8 w-8 hover:opacity-80"/>
                    </a>
                    <a href="https://linkdin.com" target="_blank" rel="noopener noreferrer">
                        <img src="/linkdin.png" alt="linkdin"
                             className="h-10 w-10 text-sky-600 hover:opacity-80"/>
                    </a>
                    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                        <img src="/pinterest.png" alt="pinterest" className="h-8 w-8 hover:opacity-80"/>
                    </a>
                    <a href="https://WeChat.com" target="_blank" rel="noopener noreferrer">
                        <img src="/wechat.png" alt="wechat" className="h-8 w-8 hover:opacity-80"/>
                    </a>
                </div>
            </nav>
        </footer>
    );
}
export default footer;