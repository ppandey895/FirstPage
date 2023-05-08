import { useState, useEffect } from 'react';

function createQuery(query, api_key) {
	return 'https://www.googleapis.com/books/v1/volumes?q=' + query + '&key=' + api_key;
}

function useFetch(query, api_key) {
	const authors = ['Paulo+Coelho', 'George+Orwell', 'John+Greene', 'Stephen+Hawking', 'Elon+Musk', 'Colleen+Hoover','Dan+Brown'];
	const [isLoading, setIsLoading] = useState(false);
	const [apiData, setApiData] = useState(null);
	const [serverError, setServerError] = useState(null);

	
	useEffect(() => {
		if(query.length === 0) {
			query = authors[Math.floor(Math.random() * 7)];
		}

		const query_string = createQuery(query, api_key);

		setIsLoading(true);
		const fetchData = () => {
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
				setApiData(dataList);
				setIsLoading(false);
			})
			.catch(err => {
				setServerError(err.message);
				setIsLoading(false);
			});

		}

		fetchData();
	}, [api_key]);
	
	return { isLoading, apiData, serverError }
}

export default useFetch;