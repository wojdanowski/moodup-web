import React, { useEffect } from 'react';
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
	const recipeId = location.pathname.split('/editRecipe/')[1];

	const { setShouldEditRecipe } = props;

	useEffect(() => {
		if (!recipeId) {
			setShouldEditRecipe(false);
		}
	}, [recipeId, setShouldEditRecipe]);

	const saveHandler = () => {
		console.log(props.newRecipe);
		axios({
			method: `${recipeId ? 'patch' : 'post'}`,
			url: `/api/v1/recipes/${recipeId ? recipeId : ''}`,
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
			data: {
				...props.newRecipe,
			},
		});

		// axios
		// 	.get(`/api/v1/recipes/${recipeId ? recipeId : ''}`, {
		// 		headers: {
		// 			Authorization: `Bearer ${props.token}`,
		// 		},
		// 	})
		// 	.then(function (response) {
		// 		console.log(response);
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});
	};

	const deleteHandler = () => {
		console.log(`delete`);
	};

	return (
		<React.Fragment>
			<Container fluid className='mt-4'>
				<Container className='d-flex justify-content-end'>
					<Button
						className='ml-2'
						variant='outline-primary'
						onClick={() => history.push('/home')}
					>
						Cancel
					</Button>
					<Button
						className='ml-2'
						variant='outline-success'
						onClick={saveHandler}
					>
						Save
					</Button>
					<Button
						className='ml-2'
						variant='danger'
						onClick={deleteHandler}
					>
						Delete
					</Button>
				</Container>
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
								value={props.newRecipe.name}
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
								value={props.newRecipe.shortDescription}
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
								value={props.newRecipe.prepTime}
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
									value={step}
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
								className='ml-2 mb-3'
								variant='outline-primary'
								onClick={() => props.addItem('prepSteps')}
							>
								Add
							</Button>
						</Form>
					</Col>

					<Col>
						<Container>
							<h4 className='my-3'>Ingredients</h4>

							<Form>
								<Form.Group
									controlId={`ingredientForm.quantity`}
								>
									<Row className='mb-2'>
										<Col lg='3' md='3' sm='2' xs='3'>
											Quantity:
										</Col>
										<Col lg='3' md='3' sm='2' xs='3'>
											Name:
										</Col>
									</Row>
									{props.newRecipe.ingredients.map(
										(ingredient, index) => (
											<React.Fragment key={index}>
												<Row>
													<span className='d-flex flex-row mb-1'>
														<Col
															className='px-1'
															lg='3'
															md='3'
															sm='2'
															xs='3'
														>
															<Form.Control
																type='text'
																defaultValue={
																	ingredient.quantity
																}
																onChange={
																	props.changeHandler
																}
															/>
														</Col>
														<Col>
															<Form.Control
																className='ml-1'
																type='text'
																defaultValue={
																	ingredient.name
																}
																onChange={
																	props.changeHandler
																}
															/>
														</Col>
														<Col>
															<Button
																variant='outline-danger'
																onClick={(
																	event
																) =>
																	props.remItem(
																		'ingredients',
																		index
																	)
																}
															>
																Remove
															</Button>
														</Col>
													</span>
												</Row>
											</React.Fragment>
										)
									)}
								</Form.Group>
								<Button
									className='ml-2'
									variant='outline-primary'
									onClick={() => props.addItem('ingredients')}
								>
									Add
								</Button>
							</Form>
						</Container>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		newRecipe: state.recipeState.newRecipe,
		token: state.authState.token,
		shouldEditRecipe: state.recipeState.shouldEditRecipe,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
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
