import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { apiFetch } from '../../api/api'
function Hosthomes({user}) {
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );
        if (!confirmDelete) {
            return;
        }
        try {
            const response = await apiFetch(
                `http://localhost:8080/api/properties/${id}`,
                {
                    method: "DELETE"
                }
            );
            if (!response.ok) {
                throw new Error(
                    `Delete failed: ${response.status}`
                );
            }
            // Remove deleted property from UI
            setProperties(prevProperties =>
                prevProperties.filter(property => property.id !== id)
            );
            console.log("Property deleted successfully");
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };

    const [properties, setProperties] = useState([]);
    useEffect(() =>{
        apiFetch("http://localhost:8080/api/properties")
            .then(res => res.json())
            .then(data => setProperties((data)))
    },[]);
    return (
        <div className="bg-blue-100 font-sans">
            <main className="container mx-auto p-8 ">
                <div className="flex flex-row justify-between items-center mb-6">
                    <div className="flex flex-row">
                        <div className="text-xl text-sky-950 font-bold tracking-wide mr-1">Welcome Owner!</div>
                        <div className="text-xl text-sky-800 font-semibold">
                            {user.firstName}
                        </div>
                    </div>
                    <h2 className="text-3xl text-sky-950 font-bold text-center">
                        Here are your Homes.
                    </h2>
                    <div className="w-1/5"></div>
                </div>

                <ul className="grid grid-cols-0 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {properties.map((property) => (
                        <div key={property.id}>
                    <li class="home-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
                        <div class="relative h-48 overflow-hidden">
                            <img src={property.imageUrl} alt="" class="w-full h-full object-cover"/>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl text-sky-800 font-semibold mb-2">
                                    {property.houseName}
                                </h3>
                                <span className="bg-sky-100 text-sky-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                type
                </span>
                            </div>
                            <p className="text-gray-600 mb-4">
                                {property.location}
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <i className="fas fa-star cursor-pointer text-amber-600"></i>
                                    <span className="text-gray-600">
                {property.rating}
                </span>
                                </div>
                                <span className="text-l font-bold text-sky-600">₹{property.price}/Night</span>
                            </div>
                        </div>

                        <div className=" flex flex-row mt-0 ml-5 mb-5 justify-between">
                            <Link to={`/host/edit-home/${property.id}`}>
                                <i className="fas fa-edit text-blue-500 text-xl hover:text-blue-950"></i>
                            </Link>
                            <button onClick={() =>{handleDelete(property.id)}} className="cursor-pointer">
                                <i className="fas fa-trash text-red-500 text-xl hover:text-red-700 mr-6"></i>
                            </button>
                        </div>
                    </li>
                        </div>
                    ))}
                </ul>
            </main>
        </div>
    );

}
export default Hosthomes;