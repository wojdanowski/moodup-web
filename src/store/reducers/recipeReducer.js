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
			if (
				action.field !== 'prepSteps' &&
				action.field !== 'ingredients'
			) {
				return {
					...state,
					newRecipe: {
						...state.newRecipe,
						[action.field]: action.value,
					},
				};
			} else {
				const fieldArray = [...state.newRecipe[action.field]];
				fieldArray[action.index] = action.value;

				return {
					...state,
					newRecipe: {
						...state.newRecipe,
						[action.field]: [...fieldArray],
					},
				};
			}
		}
		case actionTypes.REMOVE_ITEM: {
			console.log(`rem item`);
			if (
				action.field !== 'prepSteps' &&
				action.field !== 'ingredients'
			) {
				return {
					...state,
				};
			}

			const fieldArray = [...state.newRecipe[action.field]];
			fieldArray.splice(action.index, 1);

			return {
				...state,
				newRecipe: {
					...state.newRecipe,
					[action.field]: [...fieldArray],
				},
			};
		}
		case actionTypes.ADD_ITEM: {
			console.log(`rem item`);
			if (
				action.field !== 'prepSteps' &&
				action.field !== 'ingredients'
			) {
				return {
					...state,
				};
			}

			const fieldArray = [...state.newRecipe[action.field]];
			fieldArray.push('');

			return {
				...state,
				newRecipe: {
					...state.newRecipe,
					[action.field]: [...fieldArray],
				},
			};
		}

		default:
			return state;
	}
};

export default authReducer;
