import React, { useState, useEffect } from 'react';
import { supabase } from '/src/client';
import { useSelector } from 'react-redux';

import Review from './Review';
import './reviews.css';

function ReviewSection({ bookId }) {

	const [review, setReview] = useState('');
	const [rating, setRating] = useState(0);
	const [wordCount, setWordCount] = useState(0);
	const [reviews, setReviews] = useState();

	const isLogged = useSelector(state => state.isLogged);
	const userId = useSelector(state => state.user);

	const getReviews = async () => {
		const { data, error } =  await supabase.from('reviews').select('*').match({bookId: bookId});
		setReviews(data);

		if(error) {
			console.log(error.message);
		}
	}

	useEffect(() => {
		getReviews();
	}, [])

	const postReview = async (e) => {
		e.preventDefault();
		if(review.length !== 0) {
			const { data, error} = await supabase.from('users').select().eq('id', userId).limit(1).single();
			await supabase.from('reviews').insert({
				review: review,
				rating: rating,
				votes: 0,
				created_by: data.username,
				bookId: bookId,
			})
			setReview('');
			setRating(0);
			setWordCount(0);
		}
		else console.log("empty comment :/");
	}

	return (
		<div className='review-section'>
			<h2>Reviews</h2>
			{
				isLogged &&
				<form action="post" className='review-form'>
					<input 
						onChange={ e => {
							setReview(e.target.value);
							setWordCount(e.target.value.length);
						}}
						value={review}
						autoComplete='off' 
						id='review-text' 
						type="text" 
						placeholder='This book is a must read for all...' 
						maxLength='80'
						required />
					<label className='word-count' htmlFor="review-text">{wordCount} / 80</label>
					<input
						onChange={ e => setRating(e.target.value)} 
						value={rating}
						id='rating' 
						type="range" 
						min='0' 
						max='5' 
						step='0.5' 
						required />
					<label htmlFor="rating">Rating: { rating }</label>
					<button onClick={postReview} >Post Review!</button>
				</form>
			}

			<div className="reviews">
				{
					reviews && reviews.length !== 0 ? 
					reviews.map((review, index) => (
						<Review data={review} key={review.created_at} index={index} />
					))
					:
					<h4>No reviews yet.</h4>
				}
					
			</div>
		</div>
	)
}

export default ReviewSection;