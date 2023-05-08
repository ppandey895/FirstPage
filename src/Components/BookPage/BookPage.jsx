import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { supabase } from '/src/client';

import ReviewSection from './ReviewSection/ReviewSection';
import './BookPage.css';

function BookPage(props) {

	const [book, setBook] = useState(null);
	const [volInfo, setVolInfo] = useState(null);

	let userState = useSelector(state => state.isLogged);
	let userId = useSelector(state => state.user);

	let { id } = useParams();
	id = id[0] === '-' ? id.slice(1, id.length) : id;

	const API_KEY = import.meta.env.VITE_API_KEY; 

	useEffect(() => {
		const url = `https://www.googleapis.com/books/v1/volumes?q=${id}&key=${API_KEY}`;
		fetch(url)
		.then(res => res.json())
		.then(data => {
			setBook(data.items[0]);
			setVolInfo(data.items[0].volumeInfo);
		})
		.catch(error => console.log(error.message));

	}, []);

	const addBookmark = async () => {
		let BOOK = {};
		const item = book.volumeInfo;
		BOOK['title'] = item.title || "title";

		let author = item.authors || ["author"];
		BOOK['author'] = author[0];
		BOOK['genre'] = item.categories ||  ":/";

		let img = item.imageLinks || '';
		BOOK['url'] = img.thumbnail || '';
		BOOK['id'] = book.id;

		let rating = item.averageRating;
		BOOK['rating'] = rating;
		// if user is logged in
		
		if(userState) {
			const { data, error } = await supabase
			.from('users')
			.select('bookmarks')
			.eq('id', userId);
			if(!error) {
				let a = data[0];

				// if there are no previous bookmarks
				if(a.bookmarks === null) {
					const { error } = await supabase	
				  	.from('users')
				  	.update({
				  		bookmarks: [BOOK]
				  	})
				  	.eq('id', userId);
				}
				else {
					const { error } = await supabase	
				  	.from('users')
				  	.update({
				  		bookmarks: [...a.bookmarks, BOOK]
				  	})
				  	.eq('id', userId);
				}
			}
		} 
		// if user is not logged
		else console.log('sign in first');
		
	}
	return (
		<>
		<div className='book-page'>
			{ book && 
				<>
				<div className="book-info">
					<div className="details">
						<div className="title"><h1>{ volInfo.title }</h1></div>
						<div className="author"><h3>{ volInfo.authors ? volInfo.authors.join(', ') : ':/' }</h3></div>
						<div className="genre">
							<span>{ volInfo.categories ? volInfo.categories.join(', ') : ':/' }</span>
						</div>
						<div className="options">
							<div className="add-fav">
								<button>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
										<path d="M0 96C0 43 43 0 96 0h96V190.7c0 13.4 15.5 20.9 26 12.5L272 160l54 43.2c10.5 8.4 26 .9 26-12.5V0h32 32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384 96c-53 0-96-43-96-96V96zM64 416c0 17.7 14.3 32 32 32H352V384H96c-17.7 0-32 14.3-32 32z" fill="#222"/>
									</svg>
									<span onClick={addBookmark}>Bookmark!</span>
								</button>
							</div>
							<div className="download">
								<button>
									<span>Download</span>
								</button>
							</div>
						</div>
					</div>
					<div className="image">
						<img src={volInfo.imageLinks && volInfo.imageLinks.thumbnail} alt="" />
					</div>
				</div>
				<div className="desc">
					<h2>Book Description</h2>
					<p>{ volInfo.description ? volInfo.description : 'Oops! No Description.' }</p>
				</div>

				<div className="general">
					<div>Rating: { volInfo.averageRating }</div>
					<div>Publisher: { volInfo.publisher }</div>
				</div>
				</>
			}
		</div>
		<ReviewSection bookId={id}/>
		</>
	)
}

export default BookPage;