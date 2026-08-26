import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import FavouriteIcon from "../../Components/favouriteIcon";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './PropertyDetails.css';
import Review from '../../Components/Review.jsx'
import { apiFetch } from "../../api/api";
function PropertyDetails({user}) {
    const {id} = useParams();
    const [property, setProperty] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());
    const [bookings, setBookings] = useState([]);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [dateError, setDateError] = useState({
        checkIn: "", checkOut: ""
    });
    const [totalPrice, setTotalPrice] = useState(0);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!user){
            navigate("/Login");
            return;
        }
        const form = e.target;
        if (dateError.checkIn || dateError.checkOut || !checkIn || !checkOut) {
            return;
        }
        // console.log(form.checkInDate);
        try
        {
            const BookingData = {
                userId: user.id,
                propertyId: property.id,
                checkIn: form.checkInDate.value,
                checkOut: form.checkOutDate.value,
                noOfGuests: Number(form.numberOfGuests.value),
            }
            try {
                const response = await apiFetch("http://localhost:8080/api/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(BookingData)
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.log(errorText);
                    throw new Error(`HTTP error: ${response.status} - ${errorText}`);
                }
                const data = await response.json();
                // console.log("Booking create ", data);
                navigate("/bookings")
            } catch (error) {
                console.error("Error creating Booking:", error);
            }
        }catch(error){
            console.error("Error creating Booking:", error);
        }
    }
    useEffect(() => {

        fetch(`http://localhost:8080/api/properties/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Not Found");
                }
                return res.json();
            }).then((data) => {
            setProperty(data)
            setLoading(false);
        }).catch((err) => {
            setError(err.message);
            setLoading(false);
        })
    }, [id]);
    useEffect(() => {
        fetch(`http://localhost:8080/api/bookings/property/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                return res.json();
            })
            .then(data => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const activeBookings = data.filter(booking => {
                    const checkOut = new Date(booking.checkOutDate);
                    checkOut.setHours(0, 0, 0, 0);

                    return checkOut >= today;
                });

                setBookings(activeBookings);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    }, [id]);
    const validatesBookingForm = (checkIn, checkOut) =>{
        if(!user){
            navigate("/Login");
            return;
        }
        let checkInError = "";
        let checkOutError = "";
        setTotalPrice(0);
        if(!checkIn) {
            setDateError({
                checkIn: "",
                checkOut: ""
            });
            return;
        }
        const checkInDate = new Date(checkIn + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if(checkInDate < today){
            checkInError = "Check-in date cannot be before today."
        }
        if(checkOut) {
            const checkOutDate = new Date(checkOut + "T00:00:00");
            if(checkOutDate <= checkInDate){
                checkOutError= "Check-out date must be after check-in date.";
            }
            const maxDate = new Date(checkInDate);
            maxDate.setMonth(maxDate.getMonth() + 2);
            if(checkOutDate > maxDate){
                checkOutError = "Booking duration cannot be more than 2 months.";
            }
            if(!checkInError && !checkOutError){
                const getDifference = checkOutDate.getTime() - checkInDate.getTime();
                const nights = getDifference / (1000 * 60 * 60 * 24);
                setTotalPrice(nights * Number(property.price));
            }
        }
        setDateError({
            checkIn: checkInError,
            checkOut: checkOutError,
        })
    }
    if (loading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>Error!</h2>
    }
    // console.log(property);
    const formatText = (value) => {
        return value.toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase());
    }
    const addSpace = (value) => {
        var len = value.length;
        var str = value.substring(0, (len / 2)) + " " + value.substring(len / 2, len);
        return str;
    }
    const isBooked = (calendarDate) => {

        const currentDate = new Date(
            calendarDate.getFullYear(),
            calendarDate.getMonth(),
            calendarDate.getDate()
        );
        return bookings.some(booking => {
            const checkIn = new Date(booking.checkInDate);
            const checkOut = new Date(booking.checkOutDate);
            const start = new Date(
                checkIn.getFullYear(),
                checkIn.getMonth(),
                checkIn.getDate()
            );
            const end = new Date(
                checkOut.getFullYear(),
                checkOut.getMonth(),
                checkOut.getDate()
            );
            if (end < currentDate) {
                return false;
            }
            return currentDate >= start && currentDate < end;
        });
    };
    const isPastDate = (calendarDate) => {
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const currentDate = new Date(
            calendarDate.getFullYear(),
            calendarDate.getMonth(),
            calendarDate.getDate()
        );

        return currentDate < today;
    };
    return (
        <section className="bg-blue-100 font-sans min-h-screen flex flex-col">
            <main className="content container mx-auto p-8">
                <h2 className="text-3xl text-sky-950 font-bold text-center mb-8">
                    {property.houseName}
                </h2>

                <div className="grid grid-cols-2 gap-2">
                    <img src={property.imageUrl} alt="" className="w-full h-61 object-cover rounded-lg"/>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <div className="flex justify-between items-start mb-4 gap-3">
                            <h3 className="text-2xl text-sky-800 font-semibold">
                                {property.houseName}
                            </h3>
                            <FavouriteIcon user = {user} propertyId={property.id}/>
                        </div>
                        <p className="text-gray-600 mb-4">
                            {property.location}
                        </p>
                        <div className="flex items-center mb-4">
                            <i className="fas fa-star text-amber-600 mr-2"></i>
                            <span className="text-gray-600">
                                {property.rating}
                            </span>
                        </div>
                        <p className="text-gray-700 mb-4 max-h-10 overflow-y-auto">
                            {property.description}
                        </p>
                        <span className="text-xl font-bold text-sky-600">₹ {property.price} /Night</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <h4 className="text-xl text-sky-800 font-semibold mb-4">House Features</h4>
                            <ul className="grid grid-cols-2 gap-2">
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <strong className="pr-2">
                                        Bedrooms:
                                    </strong>
                                    {property.houseFeatures?.bedrooms}
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <strong className="pr-2">
                                        Bathrooms:
                                    </strong>
                                    {property.houseFeatures?.bathrooms}
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <strong className="pr-2">
                                        Kitchen:
                                    </strong>
                                    {property.houseFeatures?.kitchens}
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <strong className="pr-2">
                                        Balconies:
                                    </strong>
                                    {property.houseFeatures?.balconies}
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <strong className="pr-2">
                                        Parking Type:
                                    </strong>
                                    {formatText(property.houseFeatures?.parkingType)}
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <strong className="pr-2">
                                        Furnishing:
                                    </strong>
                                    {formatText(property.houseFeatures?.furnishingType)}
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <h4 className="text-xl text-sky-800 font-semibold mb-4">Host Information</h4>
                            {property.owner && (
                                <div className="flex flex-row justify-between">
                                    <div>
                                        <p className="mb-2"><strong className="mr-2">Name:</strong>
                                            {property.owner.ownerName}
                                        </p>
                                        <p className="mb-2"><strong className="mr-2">Email:</strong>
                                            {property.owner.ownerEmail}
                                        </p>
                                        <p className="mb-2"><strong className="mr-2">Contact:</strong>
                                            {addSpace(property.owner.contactNumber)}
                                        </p>
                                        <p className="mb-2"><strong className="mr-2">Address:</strong>
                                            {property.owner.ownerAddress}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-2"><strong className="mr-2">Member since:</strong>
                                            2023-January
                                        </p>
                                        <p className="mb-2"><strong className="mr-2">Response rate:</strong>
                                            80%
                                        </p>
                                        <p><strong className="mr-2">Response time:</strong>
                                            9.00 Am - 7.00 Pm
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Review user = {user} propertyId = {property.id}/>
                    </div>

                    <div>
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <h4 className="text-xl text-sky-800 font-semibold mb-4">Amenities</h4>
                            <ul className="grid grid-cols-2 gap-2 max-h-22 overflow-y-auto">
                                {property.amenities.map((amenities) => (
                                    <div key={amenities.id}>
                                        <li className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-2"></i>
                                            {amenities.name}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h4 className="text-xl text-sky-800 font-semibold mb-1.5">Availability</h4>
                            <p className="text-sky-950">You can book for up to 2 months.</p>
                            <div className=" item-center content-center text-center">
                                <Calendar
                                    onChange={setDate}
                                    value={date}
                                    tileDisabled={({ date }) => isPastDate(date) || isBooked(date)}
                                    tileClassName={({ date }) => {

                                        if (isPastDate(date)) {
                                            return "past-date";
                                        }

                                        if (isBooked(date)) {
                                            return "booked-date";
                                        }

                                        return "available-date";
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h4 className="text-xl text-sky-800 font-semibold mb-4">Book this place</h4>
                        <form onSubmit={handleSubmit}>
                            <span id="ErrorInDate" className="text-red-700"></span>
                            <input type="hidden" name="homeId" value="<%= home._id %>"/>
                            <div className="mb-4">
                                <label htmlFor="checkInDate" className="block text-gray-700 mb-2">Check-in Date</label>
                                <input type="date" id="checkInDate" name="checkInDate" value={checkIn}
                                       onChange={(e) =>{
                                          const value=  e.target.value;
                                          setCheckIn(value);
                                          validatesBookingForm(value, checkOut);
                                       }}
                                       className="w-full px-3 py-2 border rounded-md"/>
                                {dateError && (
                                    <p className="text-red-500 text-sm mt-1">{dateError.checkIn}</p>
                                )}
                                <span id="checkInDateError" className="text-red-500"></span>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="checkOutDate" className="block text-gray-700 mb-2">Check-out
                                    Date</label>
                                <input type="date" id="checkOutDate" name="checkOutDate" value={checkOut}
                                       onChange={(e) =>{
                                           const value=  e.target.value;
                                           setCheckOut(value);
                                           validatesBookingForm(checkIn, value);
                                       }}
                                       className="w-full px-3 py-2 border rounded-md"/>
                                {dateError && (
                                    <p className="text-red-500 text-sm mt-1">{dateError.checkOut}</p>
                                )}
                                <span id="checkOutDateError" className="text-red-500"></span>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="numberOfGuests" className="block text-gray-700 mb-2">Number of
                                    Guests</label>
                                <input type="number" id="numberOfGuests" name="numberOfGuests" min="1"
                                       className="w-full px-3 py-2 border rounded-md"/>
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-700">Price per night: ₹
                                    {property.price}
                                </p>
                                {totalPrice > 0 && (
                                <p className="text-gray-700">Total price:
                                    <span className="font-bold text-green-600 ml-2">
                                        ₹{totalPrice.toFixed(2)}
                                    </span>
                                </p>)}
                                <input type="hidden" name="totalPrice" id="totalPrice" />
                                <input type="hidden" id="pricePerNight" value={property.price}/>
                            </div>
                            <div>
                                <button type="submit" id="bookNowButton"
                                        className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition duration-300">Book
                                    Now
                                </button>
                                <div className="flex flex-row">
                                <img src="/razorpay-com-logo.png" alt="razorpay.com logo" className="h-35 w-4s0"/>
                                <img src="/img.png" className="h-15 w-20 mt-10"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

        </section>

    );
}

export default PropertyDetails;