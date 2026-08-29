import {useNavigate, Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import FavouriteIcon from "../Components/favouriteIcon";

function PropertyCard({property, user}) {
    return (
        <div>
            <div className="relative h-48 overflow-hidden">
                <img src={property.imageUrl} alt="" className="w-full h-full object-cover"/>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl text-sky-800 font-semibold mb-2">{property.houseName}</h3>
                    <FavouriteIcon user={user} propertyId={property.id}/>
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

        </div>


    );
}

export default PropertyCard;