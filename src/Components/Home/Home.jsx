import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Cards from '../Cards';
import './Home.css';

function Home() {
	return (
		<div className="home">
			<motion.div initial={{x: -100}} animate={{x: 0}} transition={{duration: 1, type:'spring', damping:8}} className="carousel">
				<div className="inner-carousel">
					<div className="carousel-item">
						<h1>Start Reading!</h1>
					</div>
					<div className="carousel-item">
						<h1>Add Books to <br />your Favourites</h1>
					</div>
					<div className="carousel-item">
						<h1>Review Books <br />to earn points.</h1>
					</div>
					<div className="carousel-item">
						<h1>Select by Genres.</h1>
					</div>
				</div>
			</motion.div>

			<motion.h2 initial={{y: -100, opacity: 0.5}} animate={{y: 0, opacity: 1}} transition={{duration: 1, type:'spring', damping: 8}} >What's New!</motion.h2>

			<Cards />
		</div>
	)
}

export default Home;