import React from 'react';
import { connect } from 'react-redux';
import * as recipeActions from './../store/actions/recipeActions';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from './../utils/axios';
import Loader from './../components/uiElements/Loader';
import { useLocation, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import RecipeFormGroup from './../components/uiElements/RecipeFormGroup';

const EditRecipe = (props) => {
	const location = useLocation();
	const history = useHistory();
	const recipeId = location.pathname.split('/viewRecipe/')[1];

	return (
		<React.Fragment>
			<Container fluid className='mt-4'>
				<Row xs={1} sm={1} md={1} lg={2}>
					<Col lg={6}>
						<h4>
							{props.shouldEditRecipe
								? 'Edit Recipe'
								: 'New Recipe'}
						</h4>
						<Form>
							<RecipeFormGroup
								groupName={'name'}
								label={'Name:'}
								formType={'text'}
								initialValue={props.newRecipe.name}
								changeHandler={(event) =>
									props.setRecipeField(
										'name',
										event.target.value
									)
								}
							/>
							<RecipeFormGroup
								groupName={'shortDescription'}
								label={'Description:'}
								formType={'textArea'}
								initialValue={props.newRecipe.shortDescription}
								changeHandler={(event) =>
									props.setRecipeField(
										'shortDescription',
										event.target.value
									)
								}
							/>
							<RecipeFormGroup
								groupName={'prepTime'}
								label={'Preparation Time:'}
								formType={'text'}
								initialValue={props.newRecipe.prepTime}
								changeHandler={(event) =>
									props.setRecipeField(
										'prepTime',
										event.target.value
									)
								}
							/>

							<Form.Label>Preparation Steps:</Form.Label>
							{props.newRecipe.prepSteps.map((step, index) => (
								<RecipeFormGroup
									key={index}
									buttonHandler={() =>
										props.remItem('prepSteps', index)
									}
									groupName={'prepSteps'}
									label={false}
									formType={'textarea'}
									initialValue={step}
									changeHandler={(event) =>
										props.setRecipeField(
											'prepSteps',
											event.target.value,
											index
										)
									}
								/>
							))}
							<Button
								className='ml-2'
								variant='outline-primary'
								onClick={() => props.addItem('prepSteps')}
							>
								Add
							</Button>
						</Form>
					</Col>

					{/* <Col>
						<Container fluid className='d-flex justify-content-end'>
							<Button className='ml-2' variant='outline-success'>
								Save
							</Button>
							<Button className='ml-2' variant='outline-danger'>
								Delete
							</Button>
						</Container>
						<h4>Ingredients</h4>
						<Row className='mt-1' xs={2} sm={2} md={2} lg={2}>
							{props.recipeDetails.ingredients.map(
								(ingredient, index) => (
									<React.Fragment key={index}>
										<Col>{ingredient.quantity}</Col>
										<Col>{ingredient.name}</Col>
									</React.Fragment>
								)
							)}
						</Row>
					</Col> */}
				</Row>
			</Container>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		selectedRecipe: state.recipeState.selectedRecipe,
		recipeDetails: state.recipeState.recipeDetails,
		newRecipe: state.recipeState.newRecipe,
		token: state.authState.token,
		shouldEditRecipe: state.recipeState.shouldEditRecipe,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setRecipeDetails: (recipe) =>
			dispatch({ type: recipeActions.SET_RECIPE_DETAILS, recipe }),
		setRecipe: (recipe) =>
			dispatch({ type: recipeActions.SET_SELECTED_RECIPE, recipe }),
		setShouldEditRecipe: (isEdit) =>
			dispatch({
				type: recipeActions.SET_IS_RECIPE_EDITION,
				isEdit,
			}),
		setRecipeField: (field, value, index = null) =>
			dispatch({
				type: recipeActions.SET_NEW_RECIPE_FIELD,
				field,
				value,
				index,
			}),
		remItem: (field, index) =>
			dispatch({
				type: recipeActions.REMOVE_ITEM,
				field,
				index,
			}),
		addItem: (field) =>
			dispatch({
				type: recipeActions.ADD_ITEM,
				field,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
