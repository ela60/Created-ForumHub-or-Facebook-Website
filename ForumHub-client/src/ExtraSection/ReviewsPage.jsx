import React, { useState, useEffect } from 'react';
import user1 from '../../src/assets/assets/menu/download.webp';
import user2 from '../../src/assets/assets/others/authentication1.png';
import user3 from '../../src/assets/assets/menu/soup-bg.jpg';
import user4 from '../../src/assets/assets/others/download (1).jpg';

const reviewsData = [
    { id: 1, name: 'John Doe', rating: 5, content: 'Great product! Highly recommend.', avatar: user1 },
    { id: 2, name: 'Jane Smith', rating: 4, content: 'Good quality, but a bit expensive.', avatar: user2 },
    { id: 3, name: 'Alice Johnson', rating: 3, content: 'Absolutely love it! Would buy again.', avatar: user3 },
    { id: 4, name: 'Bob Williams', rating: 3, content: 'It’s okay, but expected more.', avatar: user4 }
];

const ReviewsPage = () => {
    const [search, setSearch] = useState('');
    const [reviewOfTheDay, setReviewOfTheDay] = useState(null);

    useEffect(() => {
        const randomReview = reviewsData[Math.floor(Math.random() * reviewsData.length)];
        setReviewOfTheDay(randomReview);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Review of the Day Section */}
            {reviewOfTheDay && (
                <section className="bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-white p-6 rounded-lg shadow-md mx-auto max-w-3xl">
                    <h2 className="text-xl md:text-2xl font-bold text-center">🎉 Review of the Day 🎉</h2>
                    <div className="flex flex-col md:flex-row items-center mt-4">
                        <img className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-3 md:mb-0 md:mr-4 border-2 border-white" 
                             src={reviewOfTheDay.avatar} alt={reviewOfTheDay.name} />
                        <div className="text-center md:text-left">
                            <h3 className="text-lg md:text-xl font-semibold">{reviewOfTheDay.name}</h3>
                            <div className="text-yellow-300">{'⭐'.repeat(reviewOfTheDay.rating)}</div>
                        </div>
                    </div>
                    <p className="mt-2 italic text-center md:text-left">"{reviewOfTheDay.content}"</p>
                </section>
            )}

            {/* Main Content */}
            <main className="flex flex-col md:flex-row p-4 gap-6">
                {/* Reviews Section */}
                <section className="w-full md:w-3/4">
                    <div className="flex flex-col sm:flex-row mb-6">
                        <input
                            type="text"
                            className="w-full sm:w-3/4 p-3 border rounded-t-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search reviews..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="p-3 bg-purple-800 text-white rounded-b-md sm:rounded-r-md sm:rounded-l-none hover:bg-blue-600 w-full sm:w-auto">
                            Write a Review
                        </button>
                    </div>

                    <div className="space-y-4">
                        {reviewsData
                            .filter(review => review.content.toLowerCase().includes(search.toLowerCase()))
                            .map(review => (
                                <div key={review.id} className="flex bg-white p-4 rounded-lg shadow-md">
                                    <img className="w-12 h-12 rounded-full mr-4" src={review.avatar} alt={review.name} />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{review.name}</h3>
                                        <div className="text-yellow-500">{'⭐'.repeat(review.rating)}</div>
                                        <p className="text-gray-700">{review.content}</p>
                                        {/* <div className="mt-2 space-x-4">
                                            <button className="text-blue-500 hover:text-blue-700">Like</button>
                                            <button className="text-blue-500 hover:text-blue-700">Reply</button>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>

                {/* Sidebar: Trending Reviews */}
                <aside className="w-full md:w-1/4">
                    <h4 className="font-semibold text-xl mb-4 text-center md:text-left">🔥 Trending Reviews</h4>
                    <ul className="space-y-2">
                        {reviewsData.slice(0, 3).map(review => (
                            <li key={review.id} className="flex bg-white p-3 rounded-lg shadow-md">
                                <img className="w-10 h-10 rounded-full mr-3" src={review.avatar} alt={review.name} />
                                <div>
                                    <h5 className="font-semibold">{review.name}</h5>
                                    <div className="text-yellow-500 text-sm">{'⭐'.repeat(review.rating)}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </aside>
            </main>
        </div>
    );
};

export default ReviewsPage;
