import { useEffect, useState } from "react";
import { apiFetch } from "../api/api"
function FavouriteIcon({ user, propertyId }) {
    const [favourite, setFavourite] = useState([]);
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {

        if (!user || !propertyId) {
            return;
        }

        apiFetch(
            `http://localhost:8080/api/users/${user.id}/favourites`
        )
            .then(res => res.json())
            .then(data => {
                setFavourite(data);
                    const exists = data.some(property => property.id === Number(propertyId));
                    setIsFavourite(exists);
            })
            .catch(error => {
                console.error("Error checking favourite:", error);
            });

    }, [user, propertyId]);


    const handleFavourite = async () => {

        if (!user) {
            alert("Please login first");
            return;
        }

        try {

            const method = isFavourite ? "DELETE" : "POST";

            const response = await apiFetch(
                `http://localhost:8080/api/users/${user.id}/favourites/${propertyId}`,
                {
                    method: method
                }
            );

            if (!response.ok) {
                throw new Error("Favourite operation failed");
            }

            setIsFavourite(!isFavourite);

        } catch (error) {
            console.error("Favourite error:", error);
        }
    };


    return (
        <button
            type="button"
            onClick={handleFavourite}
            className="cursor-pointer"
        >
            <i className={
                    isFavourite
                        ? "fas fa-heart text-red-500 text-xl"
                        : "far fa-heart text-gray-500 text-xl"
                }
            ></i>
        </button>
    );
}

export default FavouriteIcon;