import {Link, useNavigate} from 'react-router-dom';
import { useRef, useEffect, useState} from 'react';
function SignUp () {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPasswordRules, setShowPasswordRules] = useState(false);
    const passwordTimer = useRef(null);
    const [passwordRules, setPasswordRules] = useState({
        length: false, uppercase: false, lowercase: false, number: false, special: false
    });
    const validatePasswordFormat = (value) =>{
        const passwordRuleData = {
            length : value.length >= 8,
            uppercase : /[A-Z]/.test(value),
            lowercase : /[a-z]/.test(value),
            number : /[0-9]/.test(value),
            special : /[!@#$%^&*(),.?":{}|<>]/.test(value)
        };
        setPasswordRules(passwordRuleData);
        return  Object.values(passwordRules).every(Boolean);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const isPasswordValid = Object.values(passwordRules).every(Boolean);
        if(!isPasswordValid){
            alert(`Password is invalid`);
            return;
        }
        if (form.password.value !== form.Conpassword.value) {
            alert("Passwords do not match");
            return;
        }

        const userDetails = {
            firstName: form.FirstName.value,
            lastName: form.LastName.value,
            userName: form.UserName.value,
            email: form.email.value,
            password: form.password.value,
            role: form.userType.value
        };

        console.log("Creating user:", userDetails);

        try {
            const response = await fetch(
                "http://localhost:8080/api/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userDetails)
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `${response.status}: ${errorText}`
                );
            }

            const data = await response.json();

            console.log("User created:", data);

            // Go to login after successful signup
            navigate("/Login");

        } catch (err) {
            console.error("Signup failed:", err);
        }
    };
    return (
        <center className="bg-gray-100 min-h-screen font-sans">
            <div className="flex items-center justify-center min-h-screen px-4">
                <center id="mainBlock">
                    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg space-y-2">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
                            <p className="text-sm text-gray-500 mt-1">Join us and get started right away</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div className="flex space-x-3">
                                <input type="text" name="FirstName" placeholder="First Name"
                                       className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                       required/>
                                <input type="text" name="LastName" placeholder="Last Name"
                                       className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                       required/>
                            </div>
                            <input type="text" name="UserName" placeholder="User Name"
                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   required/>
                            <input type="email" name="email" placeholder="Email address"
                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   required/>
                            <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                            <input  type={showPassword ? "text" : "password"}
                                   name="password" placeholder="Password" value={password}
                                   onChange={(e) => {
                                       const value = e.target.value;
                                       setPassword(value);
                                       setShowPasswordRules(false);
                                       clearTimeout(passwordTimer.current);
                                       passwordTimer.current = setTimeout(() => {
                                           validatePasswordFormat(value);
                                           setShowPasswordRules(true);
                                       }, 500);
                                   }}
                                   className="flex-1 px-4 py-2 outline-none"
                                   required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="bg-gray-100 border-l border-gray-300 px-3 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
                                <img
                                    src={showPassword ? "/hidden.png" : "/eye.png"}
                                    alt={showPassword ? "Hide Password" : "Show Password"}
                                    className="h-6 w-6"
                                />
                            </button>
                            </div>
                                {showPasswordRules && !Object.values(passwordRules).every(Boolean) && (
                                    <div>
                                        <p className="text-red-600">
                                            Password should have be 8 character long and should have at least one
                                            [0-9, A-Z, a-z, @#$%^&/!*()|]
                                        </p>
                                    </div>)}
                            <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                            <input type={showConfirmPassword ? "text" : "password"} name="Conpassword" placeholder="Confirm Password"
                                   className="flex-1 px-4 py-2 outline-none"
                                   required/>
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="bg-gray-100 border-l border-gray-300 px-3 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
                                <img
                                    src={showConfirmPassword ? "/hidden.png" : "/eye.png"}
                                    alt={showConfirmPassword ? "Hide Password" : "Show Password"}
                                    className="h-6 w-6"
                                />
                            </button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <label className="text-gray-700 font-medium">User Type:</label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="userType" value="USER" className="accent-blue-600"/>
                                    <span className="text-sm text-gray-700">Guest</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="userType" value="OWNER" className="accent-blue-600"/>
                                    <span className="text-sm text-gray-700">Host</span>
                                </label>
                            </div>
                            <label className="flex items-start space-x-2">
                                <input type="checkbox" name="terms" required className="accent-blue-600 mt-1"/>
                                <span className="text-sm text-gray-600">I agree to the  <a href=""

                                                                                           className="text-blue-600 hover:underline">Terms and Condition.</a>.</span>
                            </label>

                            <button type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300">
                                Sign Up
                            </button>
                        </form>
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?
                            <Link to="/login" className="text-blue-600 hover:underline font-medium">Log In</Link>
                        </p>
                    </div>

                </center>

                <div id="termBlock"
                     className=" hidden fixed mt-0 bg-black bg-opacity-60 items-center justify-center z-50">
                    <div className="bg-sky-950 w-full max-w-2xl p-6 rounded-2xl relative text-white overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>

                        <div className="flex justify-center mb-5">
                            <button onClick="closeTerms()"
                                    className="absolute top-4 border-2 font-extrabold rounded-full"
                                    >✖
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </center>
    );
}
export default SignUp;