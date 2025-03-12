import React from 'react';

const ReviewCard = ({ review }) => (
    <div className="border rounded-lg p-4 shadow-md bg-white">
        <h4 className="font-semibold">{review.user}</h4>
        <p className="text-yellow-500">⭐ {review.rating}/5</p>
        <p className="text-gray-600 italic">{review.comment}</p>
        <p className="text-sm text-gray-400">Posted on {new Date(review.created_at).toLocaleDateString()}</p>
    </div>
);

export default ReviewCard;
