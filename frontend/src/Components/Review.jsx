import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/api'
function Review({user, propertyId}){
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        if(!user){
            navigate("/Login");
            return;
        }
        const reviewData = {
            reviewerName : user.firstName,
            email : user.email,
            rating : rating,
            comment : form.comment.value
        }
        // console.log(reviewData);
        const response = await apiFetch(`http://localhost:8080/api/properties/${propertyId}/reviews`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
        if(!response.ok){
            const errorText = await response.text();
            console.error("Backend error:", errorText);
            throw new Error(
                `HTTP error: ${response.status} - ${errorText}`
            );
        }
        const newReview = await response.json();
        setReviews(prevReviews => [
            ...prevReviews,
            newReview
        ]);
        form.reset();
        setRating(0);
    };
    useEffect(() => {
        fetch(`http://localhost:8080/api/properties/${propertyId}/reviews`)
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((error) => console.error(error));
    }, [propertyId]);
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h4 className="text-xl text-sky-800 font-semibold mb-2">Guest Reviews</h4>
            <form onSubmit={handleSubmit} className="mb-2">
            <div className="flex gap-1 mb-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <i key={star} onClick={() => setRating(star)} className={`fas fa-star text-2xl cursor-pointer ${
                            star <= rating ? "text-amber-500" : "text-gray-300" }`}
                    ></i>
                ))}
            </div>
            <div className="w-full flex flex-row">
                <textarea className="bg-gray-100 rounded-lg pl-3.5 pt-1 w-full border-2 border-emerald-900 "
                placeholder="Add Comment" name="comment"
                ></textarea>
                <button type="submit" className="ml-2 cursor-pointer"
                        value="Submit"><i className="fas fa-plus-circle text-4xl text-emerald-900"></i></button>
            </div>
            </form>
            <div className="mb-2 max-h-24 overflow-y-auto">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div className="mb-2 border-2 border-blue-400 rounded-lg p-4 mr-4">
                            <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold mr-2">
                                                {review.reviewerName}
                                            </span>
                                <span className="text-amber-600">
                                                 <i className="fas fa-star text-amber-600 mr-2"></i>
                                    {review.rating}
                                            </span>
                            </div>
                            <p className="text-gray-600">
                                {review.comment}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center mb-2 text-amber-600">
                        No reviews yet!
                    </div>
                )}
            </div>
        </div>
    );
}
export default Review;