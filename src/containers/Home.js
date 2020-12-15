import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Loader from './../components/uiElements/Loader';
import axios from './../utils/axios';
import styled from 'styled-components';
import * as recipeActions from './../store/actions/recipeActions';
import RecipeCard from './../components/RecipeCard';

const Styles = styled.div`
	&:hover h4 {
		color: ${(props) => props.theme.mainColor};
	}
`;

function Home(props) {
	const [shouldFetch, setShouldFetch] = useState(true);
	const [recipes, setRecipes] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { token, setRecipe } = props;
	const history = useHistory();

	const setSelectedRecipe = useCallback((recipe) => setRecipe(recipe), [setRecipe]);

	const onSuccess = (res) => {
		setRecipes(res.data.data.data);
		setIsLoading(false);
	};

	const onFail = (err) => {
		setIsLoading(false);
		alert(err);
	};

	const recipeClickedHandler = (recipe) => {
		setSelectedRecipe(recipe);
		history.push(`/viewRecipe/${recipe.id}`);
	};

	useEffect(() => {
		if (shouldFetch && token) {
			setIsLoading(true);
			axios
				.get('/api/v1/recipes/', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(function (response) {
					onSuccess(response);
				})
				.catch(function (error) {
					onFail(error);
				});
			setShouldFetch(false);
		}
	}, [shouldFetch, token]);

	let content;
	if (isLoading && !recipes) {
		content = (
			<Container fluid className='d-flex min-vh-100 justify-content-center align-items-center'>
				<Loader />
			</Container>
		);
	} else if (recipes) {
		content = (
			<React.Fragment>
				<Container fluid>
					<h2>Latest Recipes</h2>
					<Row xs={1} sm={1} md={3}>
						{recipes.map((recipe) => (
							<Col key={recipe.id}>
								<Styles onClick={() => recipeClickedHandler(recipe)}>
									<RecipeCard recipe={recipe} />
								</Styles>
							</Col>
						))}
					</Row>
				</Container>
			</React.Fragment>
		);
	}

	return <div>{content}</div>;
}

const mapStateToProps = (state) => {
	return {
		token: state.authState.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setRecipe: (recipe) => dispatch({ type: recipeActions.SET_SELECTED_RECIPE, recipe }),
		setRecipeDetails: (recipe) => dispatch({ type: recipeActions.SET_RECIPE_DETAILS, recipe }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
