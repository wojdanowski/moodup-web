import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as links from './../utils/links';
import LogInForm from './../components/LogInForm';
import * as authActions from './../store/actions/authActions';

function Login(props) {
	let history = useHistory();
	const [signingUp, setSigningUp] = useState(false);
	const [enteredEmail, setEnteredEmail] = useState(null);
	const [enteredPassword, setEnteredPassword] = useState(null);
	const [enteredConfirmPassword, setEnteredConfirmPassword] = useState(null);

	const emailChangedHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const passwordChangedHandler = (event) => {
		setEnteredPassword(event.target.value);
	};

	const passwordConfirmChangedHandler = (event) => {
		setEnteredConfirmPassword(event.target.value);
	};

	const authFail = (err) => {
		alert(err);
		props.setIsLoading(false);
	};

	const authSuccess = (res) => {
		props.setIsLoading(false);
		const userId = res.data.data.user._id;
		const token = res.data.token;
		props.setUserData(token, userId);
		history.push('/home');
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		props.setIsLoading(true);

		let body = {
			email: enteredEmail,
			password: enteredPassword,
		};

		if (signingUp) {
			body = { ...body, passwordConfirm: enteredConfirmPassword };
		}

		axios
			.post(
				`${links.apiUrl}/api/v1/users/${
					signingUp ? 'signup' : 'login'
				}`,
				body
			)
			.then(function (response) {
				authSuccess(response);
			})
			.catch(function (error) {
				authFail(error);
			});
	};

	return (
		<LogInForm
			onEmailChanged={emailChangedHandler}
			onPasswordChanged={passwordChangedHandler}
			onConfirmPasswordChanged={passwordConfirmChangedHandler}
			onFormSubmit={submitHandler}
			loading={props.isLoading}
			isSigningUp={signingUp}
			onSigningUp={() => setSigningUp(!signingUp)}
		/>
	);
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.authState.isLoading,
		token: state.authState.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setIsLoading: (loading) =>
			dispatch({ type: authActions.SET_AUTH_IS_LOADING, loading }),
		setUserData: (token, userId) =>
			dispatch({ type: authActions.SET_USER_DATA, token, userId }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
