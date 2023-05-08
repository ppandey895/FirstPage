import React, { useState, useRef } from 'react';
import { supabase } from '/src/client';
import { useDispatch } from 'react-redux';

function SignIn() {
	const emailId = useRef();
	const pswd = useRef();
	const [showPass, setShowPass] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const logIn = async (e) => {
		e.preventDefault();
		const { data, error } = await supabase.auth.signInWithPassword({
			email: emailId.current.value,
			password: pswd.current.value,
		});

		if(error) {
			setError({message: error.message});
		}

		else {
			dispatch({
				type: 'SIGN_IN',
				payload: {
					user: data.user.id,
					session: data.session.access_token,
					isLogged: true,
				}
			})
		}
		
	}

	return (
		<div className='signin'>
			<form onSubmit={logIn}>
				<input 
					type="text" 
					placeholder='Enter mail ID'
					ref={emailId} />
				<div className='pass'>
					<input 
						id='login' 
						type={showPass ? 'text' : 'password'} 
						placeholder='Enter password'
						ref={pswd} />
					<label htmlFor="login" onClick={() => setShowPass(!showPass)}>
						{
							showPass ? 
							(
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
									<path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/>
								</svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
									<path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
								</svg>
							)
						}
					</label>
				</div>
				<span style={{ color: '#f77', fontSize: '0.9rem' }}>
					{ error === null ? '' : `error: ${error.message?.toLowerCase()}` }
				</span>
				<button>Sign In</button>
			</form>
		</div>	
	)
}

export default SignIn;