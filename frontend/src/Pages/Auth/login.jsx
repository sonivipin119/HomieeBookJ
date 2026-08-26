import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
function login({setUser}) {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const loginData = {
            email: form.email.value,
            password: form.password.value,
        };
        try{
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData)
            });
            if(!response.ok){
                throw new Error("Invalid login credentials");
            }
            const data = await response.json();
            console.log(data);
            const user = {
                id: data.id,
                firstName: data.firstName,
                email: data.email,
                role: data.role
            }
            localStorage.setItem("token", data.token);
            // localStorage.setItem("user", JSON.stringify(user));

            setUser(user);
            if(user.role === "USER"){
                navigate("/homes");
            }
            else if(user.role === "OWNER"){
                navigate("/host/homelistpage");
            }
        }catch (error){
            console.log(error);
            alert("Could not log in");
        }
    }
    const handleGoogleLogin = () => {

        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen font-sans">

        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md login-container">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
                    <p className="text-gray-600">Please login to your account</p>
                </div>

                <form onSubmit={handleSubmit} action="/api/properties/homes" method="POST" className="space-y-6">

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email"
                                   className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="Username/Email"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition
                        duration-200 transform hover:scale-[1.02]">
                        Sign In
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account?
                            <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">Sign up</a>
                        </p>
                    </div>
                    <div className="border-t">
                        <p className="text-center text-gray-500 text-sm mb-4">Or login with</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={handleGoogleLogin}
                               className="bg-white border border-gray-300 shadow px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-md transition">
                                <img src="/search.png" alt="Google" className="w-5 h-5"/>
                                <span className="text-sm text-gray-700">Login with Google</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </section>
    );
}

export default login;