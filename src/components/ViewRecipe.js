import React, { useState, useEffect, useCallback } from 'react';
import RecipeCard from './RecipeCard';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from './../utils/axios';
import Loader from './uiElements/Loader';
import { useHistory, useLocation } from 'react-router-dom';
import * as recipeActions from './../store/actions/recipeActions';

const ViewRecipe = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const { token, selectedRecipe, recipeDetails, setRecipeDetails } = props;
	const location = useLocation();
	const history = useHistory();
	const setFullRecipe = useCallback((recipe) => setRecipeDetails(recipe), [setRecipeDetails]);

	const recipeId = location.pathname.split('/viewRecipe/')[1];

	const recipeEditHandler = () => {
		props.setShouldEditRecipe(true);
		history.push(`/editRecipe/${recipeId}`);
	};

	useEffect(() => {
		setIsLoading(true);
		if (token) {
			axios
				.get(`/api/v1/recipes/${recipeId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(function (response) {
					setFullRecipe(response.data.data.data);
					setIsLoading(false);
				})
				.catch(function (error) {
					setFullRecipe(null);
					alert(error);
					setIsLoading(false);
				});
		}
	}, [token, selectedRecipe, setFullRecipe, recipeId]);

	let content;
	if (isLoading || !recipeId) {
		content = (
			<Container fluid className='d-flex min-vh-100 justify-content-center align-items-center'>
				<Loader />
			</Container>
		);
	} else if (recipeDetails) {
		content = (
			<React.Fragment>
				<Container fluid className='mt-4'>
					<Row xs={1} sm={1} md={1} lg={2}>
						<Col lg={6}>
							<RecipeCard recipe={recipeDetails} />
						</Col>
						<Col>
							<Button className='my-2' variant='outline-primary' onClick={recipeEditHandler}>
								Edit
							</Button>
							<h4>Ingredients</h4>
							<Row className='mt-1' xs={2} sm={2} md={2} lg={2}>
								{recipeDetails.ingredients.map((ingredient, index) => (
									<React.Fragment key={index}>
										<Col>{ingredient.quantity}</Col>
										<Col>{ingredient.name}</Col>
									</React.Fragment>
								))}
							</Row>
						</Col>
					</Row>
					<p className='mt-3'>{recipeDetails.shortDescription}</p>
					<h4 className='mb-3'>Preparing</h4>
					<ol>
						{recipeDetails.prepSteps.map((step, index) => (
							<li key={index}>{step}</li>
						))}
					</ol>
				</Container>
			</React.Fragment>
		);
	} else {
		content = null;
	}

	return content;
};

const mapStateToProps = (state) => {
	return {
		selectedRecipe: state.recipeState.selectedRecipe,
		recipeDetails: state.recipeState.recipeDetails,
		token: state.authState.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setRecipeDetails: (recipe) => dispatch({ type: recipeActions.SET_RECIPE_DETAILS, recipe }),
		setRecipe: (recipe) => dispatch({ type: recipeActions.SET_SELECTED_RECIPE, recipe }),
		setShouldEditRecipe: (isEdit) =>
			dispatch({
				type: recipeActions.SET_IS_RECIPE_EDITION,
				isEdit,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipe);
