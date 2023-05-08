import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import Card from '../Card';
import './Explore.css';

function Explore() {

	const [result, setResult] = useState();
	const query = useRef();
	const [searched, setSearched] = useState(false);

	const API_KEY = "AIzaSyDyZhR6gwfh50HbJqE9gaWsuNRs56rqaYk";

	const fetchData = () => {
		let q = query ? query.current.value : 'random';

		let query_string = 'https://www.googleapis.com/books/v1/volumes?q=' + q + '&key=' + API_KEY;
		fetch(query_string)
		.then(response => response.json())
		.then(data => {
			var list = data.items;
			var dataList = [];
			for(var i = 0; i < 10; i++) {
				let item = list[i].volumeInfo;

				let book = {};
				book.title = item.title || "title";

				let author = item.authors || ["author"];
				book.author = author[0];
				book.genre = item.categories ||  ":/";

				let img = item.imageLinks || '';
				book.url = img.thumbnail || '';
				book.id = item.id;

				let rating = item.averageRating;
				book.rating = rating;

				book.id = list[i].id;
				dataList.push(book);
			}
			setResult(dataList);
		})
		.catch(err => {
			console.log('error: ', err.message);
		});
	}

	useEffect(() => {
		// fetchData();
	}, []);

	const handleSearch = (e) => {
		query.current.value.replace(' ', '+');
		fetchData();
		e.preventDefault();
	}

	return (
		<div className='explore'>
			<motion.h1 initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 2, type:'spring', damping: 8}}>Explore your<br />favourite books.</motion.h1>
			<form className='search'>
			    <input ref={query} type="text" />
			    <button type="submit"
			    	onClick={ handleSearch }>
			    	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/>
					</svg>
			    </button>
			</form>

			{ !result && <motion.span initial={{width: 0}} animate={{width: '80%'}} transition={{duration: 1, type:'spring', damping: 10}} className="no-results"><h2>Nothing to Show.</h2></motion.span> }

			{ 
				result && 
				<div className='cards'>
					{
						result.map( book => (
							<Card key={book.id} book={book} />
						))
					}
				</div>
			}
		</div>
	)
}

export default Explore;