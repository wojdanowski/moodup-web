import React, { useEffect, useState } from 'react';
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
	const [isLoading, setIsLoading] = useState(false);

	const { setShouldEditRecipe } = props;

	useEffect(() => {
		if (!recipeId) {
			setShouldEditRecipe(false);
		}
	}, [recipeId, setShouldEditRecipe]);

	const onFail = (error) => {
		alert('Error');
		console.log(error);
		setIsLoading(false);
	};
	const onSuccess = () => {
		alert('Success');
		setIsLoading(false);
		history.push('/home');
	};

	const saveHandler = () => {
		setIsLoading(true);
		const filteredPrepSteps = props.newRecipe.prepSteps.filter((el) => el);
		const filteredIngredients = props.newRecipe.ingredients.filter((el) => el.name);
		axios({
			method: `${recipeId ? 'patch' : 'post'}`,
			url: `/api/v1/recipes/${recipeId ? recipeId : ''}`,
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
			data: {
				...props.newRecipe,
				prepSteps: [...filteredPrepSteps],
				ingredients: [...filteredIngredients],
			},
		})
			.then(function (response) {
				onSuccess();
			})
			.catch(function (error) {
				onFail();
			});
	};

	const deleteHandler = () => {
		setIsLoading(true);
		axios({
			method: 'delete',
			url: `/api/v1/recipes/${props.selectedRecipe.id}`,
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		})
			.then(function (response) {
				onSuccess();
			})
			.catch(function (error) {
				onFail();
			});
	};

	const content = isLoading ? (
		<Container fluid className='d-flex min-vh-100 justify-content-center align-items-center'>
			<Loader />
		</Container>
	) : (
		<React.Fragment>
			<Container fluid className='mt-4'>
				<Container className='d-flex justify-content-end'>
					<Button className='ml-2' variant='outline-primary' onClick={() => history.push('/home')}>
						Cancel
					</Button>
					<Button className='ml-2' variant='outline-success' onClick={saveHandler}>
						Save
					</Button>
					{props.shouldEditRecipe && (
						<Button className='ml-2' variant='danger' onClick={deleteHandler}>
							Delete
						</Button>
					)}
				</Container>
				<Row xs={1} sm={1} md={1} lg={2}>
					<Col lg={6}>
						<h4>{props.shouldEditRecipe ? 'Edit Recipe' : 'New Recipe'}</h4>
						<Form>
							<RecipeFormGroup
								groupName={'name'}
								label={'Name:'}
								formType={'text'}
								initialValue={props.newRecipe.name}
								changeHandler={(event) => props.setRecipeField('name', event.target.value)}
							/>
							<RecipeFormGroup
								groupName={'shortDescription'}
								label={'Description:'}
								formType={'textArea'}
								initialValue={props.newRecipe.shortDescription}
								changeHandler={(event) => props.setRecipeField('shortDescription', event.target.value)}
							/>
							<RecipeFormGroup
								groupName={'prepTime'}
								label={'Preparation Time:'}
								formType={'text'}
								initialValue={props.newRecipe.prepTime}
								changeHandler={(event) => props.setRecipeField('prepTime', event.target.value)}
							/>

							<Form.Label>Preparation Steps:</Form.Label>
							{props.newRecipe.prepSteps.map((step, index) => (
								<RecipeFormGroup
									key={index}
									buttonHandler={() => props.remItem('prepSteps', index)}
									groupName={'prepSteps'}
									label={false}
									formType={'textarea'}
									initialValue={step}
									changeHandler={(event) =>
										props.setRecipeField('prepSteps', event.target.value, index)
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
								<Form.Group controlId={`ingredientForm.quantity`}>
									<Row className='mb-2'>
										<Col lg='3' md='3' sm='2' xs='3'>
											Quantity:
										</Col>
										<Col lg='3' md='3' sm='2' xs='3'>
											Name:
										</Col>
									</Row>
									{props.newRecipe.ingredients.map((ingredient, index) => (
										<React.Fragment key={index}>
											<Row>
												<span className='d-flex flex-row mb-1'>
													<Col className='px-1' lg='3' md='3' sm='2' xs='3'>
														<Form.Control
															type='text'
															value={ingredient.quantity}
															onChange={(event) =>
																props.setRecipeField(
																	'ingredients',
																	{
																		quantity: event.target.value,
																	},
																	index
																)
															}
														/>
													</Col>
													<Col>
														<Form.Control
															className='ml-1'
															type='text'
															value={ingredient.name}
															onChange={(event) =>
																props.setRecipeField(
																	'ingredients',
																	{
																		name: event.target.value,
																	},
																	index
																)
															}
														/>
													</Col>
													<Col>
														<Button
															variant='outline-danger'
															onClick={(event) => props.remItem('ingredients', index)}
														>
															Remove
														</Button>
													</Col>
												</span>
											</Row>
										</React.Fragment>
									))}
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

	return content;
};

const mapStateToProps = (state) => {
	return {
		newRecipe: state.recipeState.newRecipe,
		token: state.authState.token,
		shouldEditRecipe: state.recipeState.shouldEditRecipe,
		selectedRecipe: state.recipeState.selectedRecipe,
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
