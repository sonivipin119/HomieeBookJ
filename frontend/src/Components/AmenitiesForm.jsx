
function Amenities({amenities}) {
    // console.log("amenities:", amenities);
    // console.log(
    //     "Swimming Pool:",
    //     amenities?.some(
    //         amenity => amenity.name === "Swimming Pool"
    //     )
    // );
    return (
        <div>
            <span className="flex items-center font-bold text-gray-800">Amenities :</span>
            <div className="flex flex-wrap items-center gap-4 mt-2">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="amenities" value="Wifi"
                           defaultChecked={amenities?.some(
                               amenity => amenity.name === "Wifi"
                           )} className="accent-blue-600"/>
                    <span className="text-sm text-gray-700">Wifi</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="amenities" value="AC"
                           defaultChecked={amenities?.some(amenity => amenity.name === "AC")} className="accent-blue-600"/>
                    <span className="text-sm text-gray-700">Air Conditioning</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="amenities" value="TV"
                           defaultChecked={amenities?.some(amenity => amenity.name ==="TV")} className="accent-blue-600" />
                    <span className="text-sm text-gray-700">TV</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="amenities" value="GYM"
                           defaultChecked={amenities?.some(amenity => amenity.name ==="GYM")} className="accent-blue-600" />
                    <span className="text-sm text-gray-700">GYM</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="amenities" value="Play Area"
                           defaultChecked={amenities?.some(amenity => amenity.name ==="Play Area")} className="accent-blue-600"/>
                    <span className="text-sm text-gray-700">Kids Play Area</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="amenities" value="Garden"
                           defaultChecked={amenities?.some(amenity => amenity.name ==="Garden")} className="accent-blue-600"/>
                    <span className="text-sm text-gray-700">Garden</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="amenities" value="CCTV"
                           defaultChecked={amenities?.some(amenity => amenity.name ==="CCTV")} className="accent-blue-600" />
                    <span className="text-sm text-gray-700">CCTV</span>
                </label>
                <label className='flex items-center space-x-2'>
                    <input type="checkbox" name="amenities" value="Swimming Pool"
                           defaultChecked={amenities?.some(amenity => amenity.name ==="Swimming Pool")} className="accent-blue-600" />
                    <span className="text-sm text-gray-700">Swimming Pool</span>
                </label>
            </div>

        </div>

    );
}

export default Amenities;
