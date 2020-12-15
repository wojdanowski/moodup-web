import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Loader from './uiElements/Loader';

function LogInForm(props) {
	let form = (
		<Form style={{ minWidth: '40vw' }} onSubmit={props.onFormSubmit}>
			<Container fluid className='d-flex flex-row justify-content-between'>
				<h1 className='text-primary'>{props.isSigningUp ? 'Sign in' : 'Login'}</h1>
				<Button variant='outline-primary' onClick={props.onSigningUp}>
					{props.isSigningUp ? 'LogIn' : 'Sign in'}
				</Button>
			</Container>
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
			{props.isSigningUp && (
				<Form.Group controlId='formBasicPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						onChange={(event) => props.onConfirmPasswordChanged(event)}
					/>
				</Form.Group>
			)}
			<Button className='w-100' variant='primary' type='submit' onClick={props.onFormSubmit}>
				Submit
			</Button>
		</Form>
	);

	if (props.loading) {
		form = <Loader />;
	}

	return <Container className='d-flex min-vh-100 justify-content-center align-items-center'>{form}</Container>;
}

export default LogInForm;
