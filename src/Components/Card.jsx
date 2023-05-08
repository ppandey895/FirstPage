import React from 'react';
import { Link } from 'react-router-dom';

function Card({ book }) {

	var ellipses = (title) => {
		if(title.slice(0, 25).length === title.length) {
			return title ;
		} else return `${title.slice(0, 25)}...`;
	}

	return (
		<div className="card">
			<img src={book.url}/>
			<div className="content">
				<p className="title">{ ellipses(book.title) }</p>
				<p>{ ellipses(book.author) }</p>
				<p className="genre"><span>{ book.genre }</span> { book.rating && <span>{ book.rating } / 5</span> }</p>
				<Link to={`/book/${book.id}`} onClick={() => {}}>Explore Book</Link>
			</div>
		</div>
	)
}

export default Card;