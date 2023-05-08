import React, { useState, useEffect } from 'react';

import Cards from '../Cards';
import { useSelector } from 'react-redux';
import { supabase } from '/src/client';

import "./BookMarks.css";

function BookMarks() {
	const isLogged = useSelector(state => state.isLogged);
	const userId = useSelector(state => state.user);
	const [bookmarks, setBookmarks] = useState();

	useEffect(() => {
		const getBookmarks = async () => {
			if(isLogged) {
				const { data, error } = await supabase
				.from('users')
				.select()
				.eq('id', userId)
				.limit(1)
				.single();

				if(!error && data.bookmarks !== null) {
					setBookmarks(data.bookmarks);
				}
			}
		}

		getBookmarks();
	}, []);	

	return (
		<div className="bookmarks">
			{
				!isLogged?
				<h2 className="message">Log In to see your bookmarks!</h2>
				:
				<>
					<h2>Your BookMarks</h2>
					{
						bookmarks && <Cards bookset={bookmarks}/>
					}
						
				</>
			}
		</div>
	)
}

export default BookMarks;