import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LogSign from '../LogSign/LogSign';
import Cards from '../Cards';
import { useSelector, useDispatch } from 'react-redux';
import { supabase } from '/src/client';

import './ProfilePage.css';

function ProfilePage() {

	let isLogged = useSelector(state => state.isLogged);
	const userId = useSelector(state => state.user);
	const dispatch = useDispatch();
	const API_KEY = 'AIzaSyDyZhR6gwfh50HbJqE9gaWsuNRs56rqaYk';

	const [user, setUser] = useState({
		name: ':/',
		favBooks: 0,
		reviews: 0,
		bio: '...nothing here',
		avatar: '',
	});

	useEffect(() => {
		const getUser = async () => {
			if(isLogged) {
				const { data, error } = await supabase
				.from('users')
				.select()
				.eq('id', userId)
				.limit(1)
				.single();

				if(!error) {
					setUser({
						name: data.username,
						bio: data.bio,
						avatar: data.avatar,
						favBooks: data.favBooks ? 1 : 0,
						reviews: data.reviews,
					});
				}
			}
			else {
				setUser({
						name: '',
						bio: '...nothing to show',
						avatar: '',
						favBooks: 0,
						reviews: 0,
					});	
			}
		}
		getUser();
	}, [isLogged]);

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		dispatch({
			type: 'SIGN_OUT',
			payload: {
				isLogged: false,
			},
		})
	}


	return (
		<>
			{
				!isLogged ? 
				<LogSign />	
				:
				<div className='profile-page'>
					<div className='title'><h2>Welcome, { user.name } !</h2></div>

					<div className='user-card'>
						<div className='profile-img'><img src={ user.avatar } alt="" /></div>
						<div className='user-info'>
							<div className='name'><h3>{ user.name }</h3></div>
							<div className='bio'>{ user.bio }</div>
							<div className='fav-count'>Favourite Books: { user.favBooks }</div>
							<div className='rev-count'>Reviews Written: { user.reviews }</div>
						</div>
					</div>
					
					<div className="options">
						<button><Link to="edit">Edit Profile</Link></button>
						<button onClick={signOut}>Sign Out</button>
					</div>
				</div>
			}
		</>
	)
}

export default ProfilePage;