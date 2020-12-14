import * as actionTypes from './../actions/recipeActions';

const initialState = {
	selectedRecipe: null,
	recipeDetails: null,
	shouldEditRecipe: false,
	newRecipe: {
		recipeName: '',
		shortDescription: '',
		prepTime: '',
		ingredients: [],
		author: '',
	},
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
			return {
				...state,
				recipeDetails: action.recipe,
			};
		}
		case actionTypes.SET_IS_RECIPE_EDITION: {
			return {
				...state,
				shouldEditRecipe: action.isEdit,
				newRecipe: {
					...state.recipeDetails,
					ingredients: [...state.recipeDetails.ingredients],
					prepSteps: [...state.recipeDetails.prepSteps],
				},
			};
		}
		case actionTypes.SET_NEW_RECIPE_FIELD: {
			return {
				...state,
				[action.field]: action.value,
			};
		}

		default:
			return state;
	}
};

export default authReducer;
