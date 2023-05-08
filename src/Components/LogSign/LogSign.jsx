import React, { useState, useEffect } from 'react';
import { supabase } from '/src/client';
import { useSelector } from 'react-redux';

import SignIn from './SignIn';
import SignUp from './SignUp';

import './logSign.css';

function LogSign() {
	const [active, setActive] = useState('in');

	const user = useSelector(state => state.user);
	
	return (
		<div className='auth'>
			<div className='options'>
				<h2 
					className={`${active === 'in' ? 'active' : ''}`}
					onClick={() => setActive('in') }>
					Sign In
				</h2>
				<h2 
					className={`${active === 'up' ? 'active' : ''}`}
					onClick={() => setActive('up') } >
					Sign Up
				</h2>
			</div>	
			{
				active === 'in' ? <SignIn /> : <SignUp />
			}	
		</div>
	)
}

export default LogSign;