import React, { useEffect, useState } from 'react';
import Card from './Card';
import useFetch from '../hooks/useFetch';

import './Cards.css';

function Skeleton() {
	return (
		<div className="card skeleton">
			<img src=''/>
			<div className="content">
				<p></p>
				<p></p>
				<p></p>
			</div>
		</div>
	)
}

function Cards({ bookset }) {
	const [books, setBooks] = useState(undefined);

	
	const API_KEY = import.meta.env.VITE_API_KEY;
	const query = '';
	const { isLoading, apiData, serverError } = useFetch(query, API_KEY);
	useEffect(() => {
		if(!bookset) setBooks(apiData);
		else {
			setBooks(bookset);
		}
	}, [isLoading]);


	return (
		<div className="cards">
			{
				!books || books.length === 0 && (
					<>
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</>
				)
			}
			{
				books && books.map( book => (
					<Card key={book.id} book={book} />
				))
			}
		</div>
	)
}

export default Cards;