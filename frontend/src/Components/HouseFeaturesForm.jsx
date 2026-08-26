function HouseFeaturesForm({ houseFeatures }) {

    return (
        <div className="flex flex-col mt-3 space-y-1.5">

            <input
                type="number"
                name="bedrooms"
                id="Bedrooms"
                placeholder="Number of Bedrooms"
                defaultValue={houseFeatures?.bedrooms || ""}
                className="bg-gray-100 rounded-lg h-10 pl-3 border-2 border-black"
                min="1"
            />

            <input
                type="number"
                name="bathrooms"
                id="Bathrooms"
                placeholder="Number of Bathrooms"
                defaultValue={houseFeatures?.bathrooms || ""}
                className="bg-gray-100 rounded-lg h-10 pl-3 border-2 border-black"
                min="1"
            />

            <input
                type="number"
                name="balconies"
                id="Balconies"
                placeholder="Number of Balconies"
                defaultValue={houseFeatures?.balconies || ""}
                className="bg-gray-100 rounded-lg h-10 pl-3 border-2 border-black"
                min="0"
            />

            <input
                type="number"
                name="kitchen"
                id="Kitchen"
                placeholder="Number of Kitchens"
                defaultValue={houseFeatures?.kitchens || ""}
                className="bg-gray-100 rounded-lg h-10 pl-3 border-2 border-black"
                min="0"
            />

            <select
                name="parkingType"
                id="Parking"
                defaultValue={houseFeatures?.parkingType || ""}
                className="bg-gray-100 rounded-lg h-10 pl-3 border-2 border-black"
            >
                <option>Parking Availability</option>
                <option value="NO_PARKING">No Parking</option>
                <option value="CLOSED_PARKING">Covered Parking</option>
                <option value="OPEN_PARKING">Uncovered Parking</option>
            </select>

            <select
                name="furnishingType"
                id="Furnishing"
                defaultValue={houseFeatures?.furnishingType || ""}
                className="bg-gray-100 rounded-lg h-10 pl-3 border-2 border-black"
            >
                <option>Furnishing Status</option>
                <option value="FULLY_FURNISHED">Fully Furnished</option>
                <option value="SEMI_FURNISHED">Semi Furnished</option>
                <option value="UNFURNISHED">Unfurnished</option>
            </select>

        </div>
    );
}

export default HouseFeaturesForm;