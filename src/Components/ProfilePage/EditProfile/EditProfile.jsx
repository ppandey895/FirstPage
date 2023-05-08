import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';
import { supabase } from '/src/client';

import './EditProfile.css';

function EditProfile() {
	const name = useRef();
	const bio = useRef();
	const [avatar, setAvatar] = useState('');
	const userId = useSelector(state => state.user);

	const editInfo = async(e) => {
		e.preventDefault();

		const { error } = await supabase
	  	.from('users')
	  	.update({
	  		username: name.current.value,
	  		bio: bio.current.value,
	  		avatar: avatar
	  	})
	  	.eq('id', userId);
		console.log(error);
			
	}

	return (
		<div className="edit-profile">
			<Link to="/profile">&lt;Go Back</Link>
			<h2>Edit Your Profile</h2>
			<form action="" onSubmit={editInfo}>
				<input 
					ref={name} 
					type="text" 
					className="username"
					placeholder="your username"/>
				<input 
					ref={bio} 
					type="text" 
					className="bio"  
					placeholder="your bio"/>
				<FileBase64
					id="avatar" 
					type="file"
					accept=".jpeg, .png"
					multiple={false}
					onDone={({base64}) => setAvatar(base64) }/>
				<button onClick={e => editInfo(e)}><Link to="/profile">Save Changes!</Link></button>
			</form>
		</div>
	)
}

export default EditProfile;