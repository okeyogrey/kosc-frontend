import { useState } from 'react';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/reviews/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Ensure user is authenticated
            },
            body: JSON.stringify({
                product: productId,
                rating,
                comment,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess('Review submitted successfully!');
            setError('');
            setRating(5);
            setComment('');
            onReviewSubmitted();  // Refresh product data
        } else {
            setError(data.detail || 'Failed to submit review.');
            setSuccess('');
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-md bg-white mt-6">
            <h3 className="text-xl font-bold mb-2">Leave a Review</h3>

            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full p-2 border rounded-md"
                    >
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>
                                {star} Star{star > 1 && 's'}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Comment</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        className="w-full p-2 border rounded-md"
                        placeholder="Share your experience..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
