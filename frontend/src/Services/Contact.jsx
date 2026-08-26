
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
function Contact(){

    const [notification, setNotification] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        setNotification("Message sent successfully! We'll get back to you soon.");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setTimeout(() => {
            setNotification("");
            form.reset();
        }, 1500);
    }
    return (
        <section className="bg-blue-100 font-sans min-h-screen flex flex-col">

        <div className="content flex-1">
            <main className="container mx-auto p-8">
                {notification && (
                    <div className="fixed inset-0 z-50">
                        {/* PAGE BACKDROP */}
                        <div className="absolute inset-0 backdrop-blur-md"></div>
                        <div className="fixed top-6 right-6 z-50 animate-[slideIn_0.3s_ease-out]">
                            <div
                                className="bg-white border-l-4 border-emerald-500 shadow-xl rounded-lg px-6 py-4 flex items-center gap-3 animate-[slideIn_0.3s_ease-out]">

                                <i className="fas fa-check-circle text-emerald-500 text-xl"></i>

                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Success
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        {notification}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white p-5 mt-10 m-auto max-w-md rounded-xl shadow-md flex flex-col items-center">
                    <div className="flex flex-col w-90">
                        <h1 className="bg-blue-100 h-10 shadow-md rounded-lg flex items-center justify-center font-bold text-xl text-gray-800">
                            Contact Us
                        </h1>

                        <form onSubmit={handleSubmit} className="flex flex-col space-y-1.5 mt-2"
                              id="contactForm">
                            <div className="flex mt-3 flex-col space-y-1.5">

                                <label htmlFor="name" className="text-sm font-medium text-gray-700 ml-1">Name</label>
                                <input type="text" name="name"
                                       className="bg-gray-100 rounded-md h-8 pl-3.5 border-2 border-black"
                                       required/>

                                <label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">Email</label>
                                <input type="email" name="email"
                                       className="bg-gray-100 rounded-md h-8 pl-3.5 border-2 border-black"
                                       required/>

                                <label htmlFor="message"
                                       className="text-sm font-medium text-gray-700 ml-1">Message</label>
                                <textarea name="message"
                                          className="bg-gray-100 rounded-md pl-3.5 pt-1 border-2 border-black" rows="4"
                                          required></textarea>

                                <button type="submit" name="submit" value="Send"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600
                                        transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                                        focus:ring-offset-2 transform hover:scale-[1.02]">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </main>
            </div>
        </section>
    );
}
export default Contact