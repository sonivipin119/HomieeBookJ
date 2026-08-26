import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { apiFetch } from "../../api/api"

function Booking({user}) {
    const BookOn = Date.now();
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        apiFetch(`http://localhost:8080/api/bookings/${user.id}`)
            .then(response => response.json())
            .then(data => setBookings(data));
    },[])
    return (
        <section className="bg-blue-100 font-sans min-h-screen flex flex-col">

            <main className="content container mx-auto p-8 flex-1">
                <h2 className="text-3xl text-gray-800 font-bold text-center mb-8">My Bookings</h2>

                {bookings.length > 0 && (
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map(booking => (
                            <div key={booking.id}>
                                <div class="booking-card bg-white rounded-lg shadow-md p-6">
                                    <h3 class="text-xl font-semibold text-gray-800 mb-2">{booking.houseName}</h3>
                                    <p class="text-gray-600 mb-4">{booking.location}</p>

                                    <div class="space-y-2 mb-4">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Check-in:</span>
                                            <span class="font-medium">{booking.checkIn}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Check-out:</span>
                                            <span class="font-medium">{booking.checkOut}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Guests:</span>
                                            <span class="font-medium">{booking.noOfGuests}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Total Price:</span>
                                            <span class="font-medium text-green-600">₹{booking.totalAmount}</span>
                                        </div>
                                    </div>

                                    <div class="border-t pt-4">
            <span class="text-sm text-gray-500">
            Booked on: {new Date(booking.bookedAt).toLocaleString()}
            </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {bookings.length === 0 && (
                    <div class="text-center py-12">
                        <p class="text-gray-600 text-lg">You haven't made any bookings yet.</p>
                        <Link to={"/homes"}
                              class="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                            Browse Homes
                        </Link>
                    </div>
                )}
            </main>

        </section>
    );
}

export default Booking;