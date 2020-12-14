import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RecipeFormGroup = (props) => {
	return (
		<Form.Group controlId={`recipeForm.${props.groupName}`}>
			{props.label && (
				<Form.Label style={{ textTransform: 'capitalize' }}>
					{props.label}
				</Form.Label>
			)}
			{props.formType === 'text' ? (
				<Form.Control
					type='text'
					defaultValue={props.initialValue}
					onChange={props.changeHandler}
				/>
			) : (
				<span className='d-flex flex-row'>
					<Form.Control
						style={{ resize: 'none' }}
						as='textarea'
						rows={3}
						defaultValue={props.initialValue}
						onChange={props.changeHandler}
					/>
					{props.buttonHandler && (
						<Button
							className='ml-2'
							variant='outline-danger'
							onClick={props.buttonHandler}
						>
							Remove
						</Button>
					)}
				</span>
			)}
		</Form.Group>
	);
};

export default RecipeFormGroup;
