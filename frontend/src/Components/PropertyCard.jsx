import { useNavigate, Link } from "react-router-dom";
import {useEffect, useState} from 'react';
import FavouriteIcon from "../Components/favouriteIcon";
function PropertyCard({user}) {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{

        fetch("http://localhost:8080/api/properties")
            .then((res) => res.json())
            .then(data => setProperties(data));
    },[]);
    return (
        <main className="content container mx-auto p-8">
            <ul className="grid grid-cols-0 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {properties.map((property) => (
                    <div key={property.id}>
                <li className="rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                    <img src={property.imageUrl} alt="" className="w-full h-full object-cover"/>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl text-sky-800 font-semibold mb-2">{property.houseName}</h3>
                        <FavouriteIcon user = {user} propertyId = {property.id} />
                    </div>
                    <p className="text-gray-600 mb-4">{property.location}</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-star cursor-pointer text-amber-600"></i>
                            <span className="text-gray-600">{property.rating}</span>
                        </div>
                        <span className="text-l font-bold text-sky-600">₹{property.price}/Night</span>
                    </div>
                </div>
                <Link to={`/properties/${property.id}`}
                        className="block bg-sky-500 text-white text-center py-3 font-semibold hover:bg-sky-600 transition duration-300">
                    View Details
                </Link>
                </li>
                    </div>
                ))}

            </ul>
        </main>


    );
}
export default PropertyCard;