import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/api"
function FavouriteList({ user }) {

    const [favourite, setFavourite] = useState([]);
    const handleFavouriteDelete = async (propertyId) =>{
        try{
            const response = await apiFetch(
                `http://localhost:8080/api/users/${user.id}/favourites/${propertyId}`,{
                method: "DELETE"
            });
            if(response.status !== 200){
                throw new Error("failed to delete favourite property");
            }
            setFavourite(fav =>
                fav.filter(property => property.id !== propertyId)
            );

        }catch(e){
            console.error("Error removing favourite", e);
        }
    };
    useEffect(() => {

        if (!user) {
            return;
        }

        apiFetch(
            `http://localhost:8080/api/users/${user.id}/favourites`
        )
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch favourites");
                }

                return res.json();
            })
            .then(data => {
                setFavourite(Array.isArray(data) ? data : []);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }, [user]);

    return (
        <section className="bg-blue-100 font-sans min-h-screen flex flex-col">

            <main className="content container mx-auto p-8 flex-1">

                <h2 className="text-3xl text-sky-950 font-bold text-center mb-8">
                    Favourite List
                </h2>

                {favourite.length === 0 ? (

                    <p className="text-center text-gray-600">
                        No favourite properties yet.
                    </p>

                ) : (

                    <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {favourite.map(fav => (

                            <li
                                key={fav.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
                            >

                                <div className="relative h-48 overflow-hidden">

                                    <img
                                        src={fav.imageUrl}
                                        alt={fav.houseName}
                                        className="w-full h-full object-cover"
                                    />

                                </div>

                                <div className="p-4">

                                    <div className="flex justify-between items-start">

                                        <h3 className="text-xl text-sky-800 font-semibold mb-2">
                                            {fav.houseName}
                                        </h3>

                                        <span className="bg-sky-100 text-sky-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                            Home
                                        </span>

                                    </div>

                                    <p className="text-gray-600 mb-4">
                                        {fav.location}
                                    </p>

                                    <div className="flex justify-between items-center">

                                        <div className="flex items-center space-x-2">

                                            <i className="fas fa-star text-amber-600"></i>

                                            <span className="text-gray-600">
                                                {fav.rating}
                                            </span>

                                        </div>

                                        <span className="text-l font-bold text-sky-600">
                                            ₹{fav.price}/Night
                                        </span>
                                        <button type="button" onClick={() => handleFavouriteDelete(fav.id)}>
                                            <i
                                                className="fas fa-trash text-red-500 text-xl hover:text-red-700"></i>
                                        </button>
                                    </div>

                                    <div className="mt-3.5">

                                        <Link
                                            to={`/properties/${fav.id}`}
                                            className="block w-full bg-sky-500 text-white text-center py-2 px-4 rounded-md hover:bg-sky-600 transition duration-300"
                                        >
                                            View Details
                                        </Link>

                                    </div>

                                </div>

                            </li>

                        ))}

                    </ul>

                )}

            </main>

        </section>
    );
}

export default FavouriteList;