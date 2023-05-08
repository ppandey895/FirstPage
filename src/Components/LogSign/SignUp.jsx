import React, { useState } from 'react';
import { supabase } from '/src/client';
import { useDispatch } from 'react-redux';

function SignUp() {
	const [emailId, setEmailId] = useState('');
	const [pswd1, setPswd1] = useState('');
	const [pswd2, setPswd2] = useState('');
	const [showPass, setShowPass] = useState(false);
	const dispatch = useDispatch();

	const createAcc = async () => {
		// signing up using SupaBase
		const { data, error } = await supabase.auth.signUp({
			email: emailId,
			password: pswd1,
		});
		
		if(error) {
			console.log(error.message);
			return ;
		}

		// Storing User in the Collection
		const { _error_ } = await supabase
		.from('users')
		.insert({ id: data.user.id })

		// Updating the state after user signup
		dispatch({
			type: 'SIGN_UP',
			payload: {
				user: data.user.id,
				session: data.session.access_token,
				isLogged: true,
			}
		})
	}

	const validate = (e) => {
		e.preventDefault();
		if(pswd1 === pswd2) {
			createAcc();
		} else {
			console.log('passwords didn\'t match');
		}
	}

	return (
		<div className='signup'>
			<form onSubmit={validate}>
				<input 
					type="text" 
					placeholder='Enter mail ID'
					onChange={e => setEmailId(e.target.value)}/>
				<div className='pass'>
					<input 
						id='create' 
						type={showPass ? 'text' : 'password'} 
						placeholder='Create password'
						onChange={e => setPswd1(e.target.value)}/>
					<label htmlFor="create" onClick={() => setShowPass(!showPass)}>
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
				<div className='pass'>
					<input 
						id='confirm' 
						type={showPass ? 'text' : 'password'} 
						placeholder='Re-enter password'
						onChange={e => setPswd2(e.target.value)}/>
					<label htmlFor="confirm" onClick={() => setShowPass(!showPass)}>
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
				<button>Sign Up</button>
			</form>
		</div>
	)
}

export default SignUp;