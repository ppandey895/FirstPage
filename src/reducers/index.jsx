const initialState = {
	isLogged: false,
	user: null,
	session: null
};

const authManage = (state = initialState, action) => {
	switch(action.type) {
		case 'SIGN_UP':
			return {
				...action.payload,
			}
		case 'SIGN_IN':
			return {
				...action.payload,
			}
		case 'SIGN_OUT':
			return initialState;
		default:
			return initialState;
	}
}

export default authManage;