import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ user , setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/Login");
    };
    return (
        <header className="bg-sky-950 text-white shadow-md">
            <nav className="container mx-auto w-full px-4 py-6 flex items-center justify-between">

                <div className="flex items-center w-full">
                    {/* Brand */}
                    <div className="mr-9">
                        <NavLink
                            to={
                                user?.role === "USER"
                                    ? "/homes"
                                    : user?.role === "OWNER" ? "/host/homelistpage" : "/"
                            }
                            className="text-xl font-bold tracking-wide text-white hover:text-blue-300 transition"
                        >HomieeBook
                        </NavLink>
                    </div>

                    {/* Left Menu */}
                    <ul className="flex space-x-3 text-sm font-medium items-center">

                        {/* Normal User */}
                        {user?.role === "USER" && (
                            <>
                                <li>
                                    <NavLink
                                        to="/homes"
                                        className={({ isActive }) =>
                                            `${isActive ? "bg-blue-600" : "hover:bg-blue-500"}
                                            py-2 px-4 rounded-lg transition duration-300`
                                        }
                                    >
                                        Homes List
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/favourite-list"
                                        className={({ isActive}) => `${isActive ?
                                        "bg-blue-600" : "hover:bg-blue-500"}
                                            py-2 px-4 rounded-lg transition duration-300`}
                                    >
                                        Favourites
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/bookings"
                                        className= {({ isActive }) => `${isActive ?
                                        "bg-blue-600" : "hover:bg-blue-500"}
                                           py-2 px-4 rounded-lg transition duration-300`}
                                    >
                                        Bookings
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/contact"
                                        className={({isActive}) => `${isActive ?
                                        "bg-blue-600" : "hover:bg-blue-500"}
                                           py-2 px-4 rounded-lg transition duration-300`}
                                    >
                                        Contact
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Owner */}
                        {user?.role === "OWNER" && (
                            <>
                                <li>
                                    <NavLink
                                        to="/host/homelistpage"
                                        className={({ isActive }) =>
                                            `${isActive ? "bg-blue-600" : "hover:bg-blue-500"}
                                            py-2 px-4 rounded-lg transition duration-300`
                                        }
                                    >
                                        Host Homes
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/host/add-home"
                                        className={({ isActive }) =>
                                            `${isActive ? "bg-blue-600" : "hover:bg-blue-500"}
                                            py-2 px-4 rounded-lg transition duration-300`
                                        }
                                    >
                                        Add Home
                                    </NavLink>
                                </li>
                            </>
                        )}

                    </ul>

                    {/* Right Menu */}
                    <ul className="flex space-x-3 text-sm mr-15 font-medium items-center ml-auto">

                            {user?.role !== "USER" && user?.role !== "OWNER" && (
                                <>
                                <li>
                                    <NavLink
                                        to="/signUp"
                                        className={({isActive}) => `${isActive ?
                                        "bg-blue-600" : "hover:bg-blue-500"}
                                           py-2 px-4 rounded-lg transition duration-300`}
                                    >
                                        Sign Up
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Login"
                                        className={({isActive}) => `${isActive ?
                                        "bg-blue-600" : "hover:bg-blue-500"}
                                           py-2 px-4 rounded-lg transition duration-300`}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                </>
                                )}
                        {(user?.role === "USER" || user?.role === "OWNER") && (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 hover:text-red-800 duration-300 cursor-pointer hover:scale-130"
                                    title="Logout">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:scale-110" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                </button>
                            </li>
                            )}
                    </ul>
                    </div>
            </nav>
        </header>
    );
}

export default Navbar;