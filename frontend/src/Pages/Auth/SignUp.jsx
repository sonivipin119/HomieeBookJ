import {Link, useNavigate} from 'react-router-dom';

function SignUp () {

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

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

                            <input type="password" name="password" placeholder="Password"
                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   required/>

                            <input type="password" name="Conpassword" placeholder="Confirm Password"
                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   required/>

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

                <div id="termBlock" className=" hidden fixed mt-0 bg-black bg-opacity-60 items-center justify-center z-50">
                    <div className="bg-sky-950 w-full max-w-2xl p-6 rounded-2xl relative text-white overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>

                        <div className="flex justify-center mb-5">
                            <button onClick="closeTerms()" className="absolute top-4 border-2 font-extrabold rounded-full"
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