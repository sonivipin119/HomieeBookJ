import HouseFeaturesForm from "../../Components/HouseFeaturesForm";
import Amenities from "../../Components/AmenitiesForm"
import OwnerInfo from "../Host/OwnerInfo"
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { apiFetch } from '../../api/api'
function AddProperty() {
    const {id} = useParams();
    const isEditEnabled = Boolean(id);
    const [property, setProperty] = useState({});
    const navigate = useNavigate();
    const [notification, setNotification] = useState("");
    useEffect(() => {
        if (!id) {
            setProperty({});
            return;
        }
        fetch(`http://localhost:8080/api/properties/${id}`)
            .then(response => response.json())
            .then(data => {
                // console.log("Existing property:", data);
                setProperty(data);
            });

    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("SUBMIT CLICKED");

        const form = e.target;
        try {
            const imageFile = form.photo.files[0];

            if (!imageFile) {
                alert("Please select a home image");
                return;
            }
            const imageFormData = new FormData();
            imageFormData.append("image", imageFile);

            const imageResponse = await apiFetch(
                "http://localhost:8080/api/images/upload",
                {
                    method: "POST",
                    body: imageFormData
                }
            );
            if (!imageResponse.ok) {
                throw new Error(
                    `Image upload failed: ${imageResponse.status}`
                );
            }
            // 3. Get Cloudinary URL
            const imageUrl = await imageResponse.text();

            // console.log("Cloudinary URL:", imageUrl);
            const addNewProperty = {
                houseName: form.houseName.value,
                location: form.location.value,
                rating: Number(form.rating.value),
                price: Number(form.price.value),
                imageUrl: imageUrl,
                description: form.description.value,

                houseFeatures: {
                    bedrooms: Number(form.bedrooms.value),
                    bathrooms: Number(form.bathrooms.value),
                    balconies: Number(form.balconies.value),
                    kitchens: Number(form.kitchen.value),
                    parkingType: form.parkingType.value || null,
                    furnishingType: form.furnishingType.value || null
                },

                amenities: Array.from(
                    form.querySelectorAll(
                        'input[name="amenities"]:checked'
                    )
                ).map(input => input.value),

                ownerInfo: {
                    ownerName: form.ownerName.value,
                    ownerEmail: form.ownerEmail.value,
                    contactNumber: form.contactNumber.value,
                    ownerAddress: form.ownerAddress.value
                }
            };

            try {
                const url = id ? `http://localhost:8080/api/properties/${id}`
                    : "http://localhost:8080/api/properties"
                const method = id ? "PUT" : "POST";
                const response = await apiFetch(url,
                    {
                        method: method,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(addNewProperty)
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();

                    console.error("Backend error:", errorText);

                    throw new Error(
                        `HTTP error: ${response.status} - ${errorText}`
                    );
                }

                const data = await response.json();

                // console.log(
                //     id ? "Property updated:" : "Property created:",
                //     data
                // );
                setNotification(id ? "Property updated successfully!" : "Property added successfully!");
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                setTimeout(() => {
                    navigate("/host/homelistpage");
                }, 1500);
            } catch (error) {
                console.error("Error creating property:", error);
            }
        } catch (error) {
            console.error("Error creating property:", error);
        }
    };
    if (isEditEnabled && !property.id) {
        return <p>Loading...</p>;
    }
    return (
        <div className="bg-blue-100 font-sans">
            <main className="container mx-auto p-8">
                {notification && (
                    <div className="fixed inset-0 z-50">
                        {/* PAGE BACKDROP */}
                        <div className="absolute inset-0 backdrop-blur-md"></div>
                        <div className="fixed top-6 right-6 z-50 animate-[slideIn_0.3s_ease-out]">
                            <div
                                className="bg-white border-l-4 border-emerald-500 shadow-xl rounded-lg px-6 py-4 flex items-center gap-3 animate-[slideIn_0.3s_ease-out]">

                                <i className="fas fa-check-circle text-emerald-500 text-xl"></i>

                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Success
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        {notification}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
                <div
                    className="container bg-white pt-6 pb-6 pl-12 pr-12 m-auto w-full text-center rounded-lg shadow-md flex flex-col">
                    <div className="flex flex-col items-center">
                        <h1
                            className="bg-blue-100 h-10 shadow-md w-80 rounded-lg flex items-center justify-center font-bold text-xl text-gray-800">
                            {id ? "Edit Home" : "Add Home"}
                        </h1>
                        <div className="w-full">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                                <div className="flex flex-col md:flex-row gap-4 items-start">
                                    <div className="flex flex-col w-full md:w-1/3 mt-3 space-y-1.5">
                                        <span className="flex items-center  font-bold mb-3 text-gray-800">House Information :</span>
                                        <input type="text"
                                               className="bg-gray-100 rounded-lg h-10 pl-3.5 border-2 border-black"
                                               name="houseName"
                                               defaultValue={property?.houseName || ""}
                                               placeholder="Enter your home here"/>

                                        <input type="text"
                                               className="bg-gray-100 rounded-lg  h-10 pl-3.5  border-2 border-black"
                                               name="price"
                                               defaultValue={property?.price || ""} placeholder="Price Per Night"/>

                                        <input type="text"
                                               className="bg-gray-100 rounded-lg  h-10 pl-3.5  border-2 border-black "
                                               name="location"
                                               defaultValue={property?.location || ""}
                                               placeholder="Enter your location here"/>

                                        <input type="text"
                                               className="bg-gray-100 rounded-lg  h-10 pl-3.5  border-2 border-black "
                                               name="rating"
                                               defaultValue={property?.rating || ""} placeholder="Rating for house"/>

                                        <textarea className="bg-gray-100 rounded-lg pl-3.5 pt-1  border-2 border-black"
                                                  name="description"
                                                  defaultValue={property?.description || ""}
                                                  placeholder="Describe your Home"></textarea>
                                        <div className="relative">
                                            <label for="photo" className="block text-sm font-medium text-gray-700 mb-1">Upload
                                                Home Photo</label>
                                            <input type="file" id="photo" name="photo" accept="image/*"
                                                   className="block w-full text-sm text-gray-500 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg
                                       file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700hover:file:bg-blue-200"/>
                                        </div>

                                    </div>
                                    <div className="w-full md:w-1/3 bg-white mt-3">
                                        <span
                                            className="flex items-center font-bold text-gray-800">House Features :</span>
                                        <HouseFeaturesForm houseFeatures={property?.houseFeatures}/>
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <OwnerInfo ownerInfo={property?.owner}/>
                                    </div>
                                </div>
                                <div>
                                    <Amenities amenities={property?.amenities}/>
                                    <button type="submit" className="bg-emerald-900 w-24 h-10 mt-3 rounded-lg font-mono text-white
                        hover:scale-110 transition-transform duration-300 ease-in-out
                        cursor-pointer">{id ? "Update" : "Submit"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AddProperty;