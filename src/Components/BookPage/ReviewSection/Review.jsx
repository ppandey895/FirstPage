import React, { useState, useRef } from 'react';
import { supabase } from '/src/client';

import './reviews.css';

function Review({ data, index }) {

	const MONTH_NAMES = [
	  'January', 'February', 'March', 'April', 'May', 'June',
	  'July', 'August', 'September', 'October', 'November', 'December'
	];

	function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
	  const day = date.getDate();
	  const month = MONTH_NAMES[date.getMonth()];
	  const year = date.getFullYear();
	  const hours = date.getHours();
	  let minutes = date.getMinutes();

	  if (minutes < 10) {
	    // Adding leading zero to minutes
	    minutes = `0${ minutes }`;
	  }

	  if (prefomattedDate) {
	    // Today at 10:20
	    // Yesterday at 10:20
	    return `${ prefomattedDate } at ${ hours }:${ minutes }`;
	  }

	  if (hideYear) {
	    // 10. January at 10:20
	    return `${ day }. ${ month } at ${ hours }:${ minutes }`;
	  }

	  // 10. January 2017. at 10:20
	  return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
	}


	// --- Main function
	function timeAgo(dateParam) {
	  if (!dateParam) {
	    return null;
	  }

	  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
	  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
	  const today = new Date();
	  const yesterday = new Date(today - DAY_IN_MS);
	  const seconds = Math.round((today - date) / 1000);
	  const minutes = Math.round(seconds / 60);
	  const isToday = today.toDateString() === date.toDateString();
	  const isYesterday = yesterday.toDateString() === date.toDateString();
	  const isThisYear = today.getFullYear() === date.getFullYear();


	  if (seconds < 5) {
	    return 'now';
	  } else if (seconds < 60) {
	    return `${ seconds } seconds ago`;
	  } else if (seconds < 90) {
	    return 'about a minute ago';
	  } else if (minutes < 60) {
	    return `${ minutes } minutes ago`;
	  } else if (isToday) {
	    return getFormattedDate(date, 'Today'); // Today at 10:20
	  } else if (isYesterday) {
	    return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
	  } else if (isThisYear) {
	    return getFormattedDate(date, false, true); // 10. January at 10:20
	  }

	  return getFormattedDate(date);
	}

	const date = new Date(data.created_at);

	const upVote = useRef();
	const downVote = useRef();
	const [votes, setVotes] = useState(0);

	const updateVotes = async (con) => {
		await supabase.from('reviews').update({
		    votes: con + data.votes,
		}).eq('created_at', data.created_at);
	}

	const handleVote = (e) => {
		e.target.classList.toggle('active');
		if(e.target.classList[0] === 'up') {
			downVote.current.classList.remove('active');
		}
		else if(e.target.classList[0] === 'down') {
			upVote.current.classList.remove('active');
		}

		if(upVote.current.classList[1] === 'active') {
			setVotes(1);
			updateVotes(1);
		}

		else if(downVote.current.classList[1] === 'active') {
			setVotes(-1);
			updateVotes(-1);
		}
		else {
			setVotes(0);
			updateVotes(0);
		}
	}

	return (
		<div className='review'>
			<div>
				<span className='user'>{data.created_by}</span>
				<span className="time">{timeAgo(date).toLowerCase()}</span>
			</div>
			<div className='text'>
				<span>{data.review}</span>
				<p>rated: {data.rating}</p>
			</div>
			<div className='votes'>
				<button id={`up-${index}`} onClick={handleVote} >
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='up' ref={upVote}><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" fill='#ddd'/></svg>
				</button>
				<label htmlFor={`up-${index}`}>
					{data.votes + votes}
				</label>
				<button id={`down-${index}`} onClick={handleVote} >
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='down' ref={downVote}>
						<path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" fill='#ddd'/>
					</svg>
				</button>
			</div>
		</div>
	)
}

export default Review;