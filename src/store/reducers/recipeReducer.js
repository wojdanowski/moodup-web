import * as actionTypes from './../actions/recipeActions';

const initialState = {
	selectedRecipe: null,
	recipeDetails: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_SELECTED_RECIPE: {
			return {
				...state,
				selectedRecipe: action.recipe,
			};
		}
		case actionTypes.SET_RECIPE_DETAILS: {
			// if (action.recipe) {
			// 	localStorage.addItem('selectedRecipe', action.recipe);
			// } else {
			// 	localStorage.removeItem('selectedRecipe');
			// }
			return {
				...state,
				recipeDetails: action.recipe,
			};
		}
		// case actionTypes.SET_USER_DATA: {
		// 	if (!action.token || !action.userId) {
		// 		localStorage.removeItem('token');
		// 		localStorage.removeItem('userId');
		// 	} else {
		// 		localStorage.setItem('token', action.token);
		// 		localStorage.setItem('userId', action.userId);
		// 	}

		// 	return {
		// 		...state,
		// 		userId: action.userId,
		// 		token: action.token,
		// 	};
		// }
		// case actionTypes.LOAD_USER_DATA_FROM_STORAGE: {
		// 	const tokenInStorage = localStorage.getItem('token');

		// 	const userIdInStorage = localStorage.getItem('userId');
		// 	let newState = {
		// 		...state,
		// 	};
		// 	if (tokenInStorage && userIdInStorage) {
		// 		newState = {
		// 			...state,
		// 			token: tokenInStorage,
		// 			userId: userIdInStorage,
		// 		};
		// 	} else
		// 		newState = {
		// 			...state,
		// 			token: null,
		// 			userId: null,
		// 		};

		// 	return {
		// 		...newState,
		// 	};
		// }
		default:
			return state;
	}
};

export default authReducer;
