import { Link } from 'react-router-dom';
function footer(){
    return (
        <footer className=" w-full">
            <nav className="bg-sky-950 p-6 text-white">
                <div className="flex flex-wrap justify-around gap-8">
                    <div>
                        <h3 className="font-bold mb-2">USEFUL LINKS</h3>
                        <ul className="space-y-1">
                            <li><Link to="/about" className="hover:text-sky-300">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-sky-300">Contact</Link></li>
                            <li><Link to="/privacy" className="hover:text-sky-300">Privacy Policy</Link></li>
                            <li><Link to="/termService" className="hover:text-sky-300">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">SUPPORT</h3>
                        <ul className="space-y-1">
                            <li><Link to="/help" className="hover:text-sky-300">Help Center</Link></li>
                            <li><Link to="/faq" className="hover:text-sky-300">FAQ</Link></li>
                            <li>
                                <Link to="/contact" className="hover:text-sky-300">Report a Problem</Link>
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
                    <Link to="https://google.com" target="_blank" rel="noopener noreferrer">
                        <img src="/google-symbol.png" alt="Google" className="h-8 w-8 hover:opacity-80"/>
                    </Link>
                    <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/instagram.png" alt="Instagram" className="h-8 w-8 hover:opacity-80"/>
                    </Link>
                    <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="/facebook.png" alt="Facebook" className="h-8 w-8 hover:opacity-80"/>
                    </Link>
                    <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="/twitter.png" alt="Twitter" className="h-8 w-8 hover:opacity-80"/>
                    </Link>
                    <Link to="https://linkdin.com" target="_blank" rel="noopener noreferrer">
                        <img src="/linkdin.png" alt="linkdin"
                             className="h-10 w-10 text-sky-600 hover:opacity-80"/>
                    </Link>
                    <Link to="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                        <img src="/pinterest.png" alt="pinterest" className="h-8 w-8 hover:opacity-80"/>
                    </Link>
                    <Link to="https://WeChat.com" target="_blank" rel="noopener noreferrer">
                        <img src="/wechat.png" alt="wechat" className="h-8 w-8 hover:opacity-80"/>
                    </Link>
                </div>
            </nav>
        </footer>
    );
}
export default footer;