import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LogInForm from './../components/LogInForm';
import axios from 'axios';
import * as links from './../utils/links';
import Layout from './../components/hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './../components/MainViews/Home';
import CreateRecipe from './../components/MainViews/CreateRecipe';
import NoMatch from './../components/MainViews/NoMatch';

function Login() {
	let history = useHistory();
	const [signingUp, setSigningUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const [enteredEmail, setEnteredEmail] = useState(null);
	const [enteredPassword, setEnteredPassword] = useState(null);

	const emailChangedHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const passwordChangedHandler = (event) => {
		setEnteredPassword(event.target.value);
	};

	// const logout = () => {
	// 	alert('User logged out!');
	// 	props.setUserData(null, null);
	// };

	// const checkAuthTimeout = (expirationTime) => {
	// 	setTimeout(() => {
	// 		logout();
	// 	}, expirationTime * 1000);
	// };

	const authFail = (err) => {
		// setErrorMsg(err.data.error.message.split('_').join(' '));
		alert(err);
		setIsLoading(false);
	};

	const authSuccess = (res) => {
		// setUserData(res.data.idToken, res.data.localId);
		// checkAuthTimeout(res.data.expiresIn);
		// const expirationDate = new Date(
		// 	new Date().getTime() + res.data.expiresIn * 1000
		// );
		// localStorage.setItem('token', res.data.idToken);
		// localStorage.setItem('expirationDate', expirationDate);
		// localStorage.setItem('userId', res.data.localId);
		setIsLoading(false);
		history.push('/home');
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const body = {
			email: enteredEmail,
			password: enteredPassword,
		};
		console.log(body);

		axios
			.post(`${links.apiUrl}/api/v1/users/login`, body)
			.then(function (response) {
				authSuccess(response);
			})
			.catch(function (error) {
				authFail(error);
			});
	};
	return (
		<React.Fragment>
			<LogInForm
				onEmailChanged={emailChangedHandler}
				onPasswordChanged={passwordChangedHandler}
				onFormSubmit={submitHandler}
				loading={isLoading}
				isSigningUp={signingUp}
			/>
		</React.Fragment>
	);
}

export default Login;
