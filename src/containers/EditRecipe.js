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

const EditRecipe = (props) => {
	const location = useLocation();
	const history = useHistory();
	const recipeId = location.pathname.split('/viewRecipe/')[1];

	// let recipeContent = props.shouldEditRecipe
	// 	? props.recipeDetails
	//     : props.newRecipe;

	// let recipeContent = props.shouldEditRecipe
	// 	? props.recipeDetails
	// 	: {
	// 			recipeName: '',
	// 			shortDescription: '',
	// 			prepTime: '',
	// 			ingredients: [],
	// 			author: '',
	// 	  };

	// const onChangeFormHandler = (formField) => {
	// 	console.log(formField);
	// };

	return (
		// <React.Fragment>
		// 	<Container fluid className='mt-4'>
		// <h4>{props.shouldEditRecipe ? 'Edit Recipe' : 'New Recipe'}</h4>
		// <Form>
		// 	<Form.Group controlId='recipeForm.Name'>
		// 		<Form.Label>Name:</Form.Label>
		// 		<Form.Control
		// 			type='text'
		// 			defaultValue={props.newRecipe.name}
		// 			onChange={(event) =>
		// 				props.setRecipeField('name', event.target.value)
		// 			}
		// 		/>
		// 	</Form.Group>
		// </Form>

		// 	</Container>
		// </React.Fragment>
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
							<Form.Group controlId='recipeForm.name'>
								<Form.Label>Name:</Form.Label>
								<Form.Control
									type='text'
									defaultValue={props.newRecipe.name}
									onChange={(event) =>
										props.setRecipeField(
											'name',
											event.target.value
										)
									}
								/>
							</Form.Group>

							<Form.Group controlId='recipeForm.shortDescription'>
								<Form.Label>Description:</Form.Label>
								<Form.Control
									type='text'
									defaultValue={
										props.newRecipe.shortDescription
									}
									onChange={(event) =>
										props.setRecipeField(
											'shortDescription',
											event.target.value
										)
									}
								/>
							</Form.Group>

							<Form.Group controlId='recipeForm.prepTime'>
								<Form.Label>Preparation Time:</Form.Label>
								<Form.Control
									type='text'
									defaultValue={props.newRecipe.prepTime}
									onChange={(event) =>
										props.setRecipeField(
											'prepTime',
											event.target.value
										)
									}
								/>
							</Form.Group>

							<Form.Label>Preparation Steps:</Form.Label>
							{props.newRecipe.prepSteps.map((step, index) => (
								<Form.Group
									controlId={`recipeForm.prepSteps${index}`}
									key={index}
								>
									<Form.Control
										style={{ resize: 'none' }}
										as='textarea'
										rows={3}
										defaultValue={props.newRecipe.prepSteps}
										// onChange={(event) =>
										// 	props.setRecipeField(
										// 		'prepSteps',
										// 		event.target.value
										// 	)
										// }
									/>
								</Form.Group>
							))}
							<Button className='ml-2' variant='outline-primary'>
								Add
							</Button>
						</Form>
					</Col>

					<Col>
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
					</Col>
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
		setRecipeField: (field, value) =>
			dispatch({
				type: recipeActions.SET_NEW_RECIPE_FIELD,
				field,
				value,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
