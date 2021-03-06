import * as actionTypes from './../actions/recipeActions';

const initialState = {
	selectedRecipe: null,
	recipeDetails: null,
	shouldEditRecipe: false,
	newRecipe: {
		name: '',
		shortDescription: '',
		prepTime: '',
		ingredients: [],
		prepSteps: [],
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
		case actionTypes.RESET_RECIPE_STATE: {
			return {
				...state,
				recipeDetails: null,
				newRecipe: { ...initialState.newRecipe },
			};
		}
		case actionTypes.SET_IS_RECIPE_EDITION: {
			const copiedRecipe = action.isEdit
				? {
						newRecipe: {
							...state.recipeDetails,
							ingredients: [...state.recipeDetails.ingredients],
							prepSteps: [...state.recipeDetails.prepSteps],
						},
				  }
				: {
						newRecipe: {
							...initialState.newRecipe,
							ingredients: [],
							prepSteps: [],
						},
				  };
			return {
				...state,
				shouldEditRecipe: action.isEdit,
				...copiedRecipe,
			};
		}
		case actionTypes.SET_NEW_RECIPE_FIELD: {
			if (action.field !== 'prepSteps' && action.field !== 'ingredients') {
				return {
					...state,
					newRecipe: {
						...state.newRecipe,
						[action.field]: action.value,
					},
				};
			} else {
				const fieldArray = [...state.newRecipe[action.field]];
				if (action.field === 'ingredients') {
					fieldArray[action.index] = {
						...fieldArray[action.index],
						...action.value,
					};
				} else {
					fieldArray[action.index] = action.value;
				}

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
			if (action.field !== 'prepSteps' && action.field !== 'ingredients') {
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
			let entry;
			if (action.field !== 'prepSteps' && action.field !== 'ingredients') {
				return {
					...state,
				};
			} else if (action.field === 'ingredients') {
				entry = { name: '', quantity: '' };
			}

			const fieldArray = [...state.newRecipe[action.field]];
			fieldArray.push(entry);

			return {
				...state,
				newRecipe: {
					...state.newRecipe,
					[action.field]: [...fieldArray],
				},
			};
		}
		case actionTypes.SET_IMAGE_TO_UPLOAD: {
			return {
				...state,
				newRecipe: {
					...state.newRecipe,
				},
				imageToUpload: action.image,
			};
		}

		default:
			return state;
	}
};

export default authReducer;
