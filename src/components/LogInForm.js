import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Loader from './uiElements/Loader';

function LogInForm(props) {
	let form = (
		<Form style={{ minWidth: '40vw' }} onSubmit={props.onFormSubmit}>
			<Form.Group controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type='email'
					placeholder='Enter email'
					onChange={(event) => props.onEmailChanged(event)}
				/>
			</Form.Group>

			<Form.Group controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					placeholder='Password'
					onChange={(event) => props.onPasswordChanged(event)}
				/>
			</Form.Group>
			<Button
				className='w-100'
				variant='primary'
				type='submit'
				onClick={props.onFormSubmit}
			>
				Submit
			</Button>
		</Form>
	);

	if (props.loading) {
		form = <Loader />;
	}

	return (
		<Container className='d-flex min-vh-100 justify-content-center align-items-center'>
			{form}
		</Container>
	);
}

export default LogInForm;
