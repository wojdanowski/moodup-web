import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as links from './../utils/links';
import Layout from './../components/hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './../components/MainViews/Home';
import CreateRecipe from './../components/MainViews/CreateRecipe';
import NoMatch from './../components/MainViews/NoMatch';
import LogInForm from './../components/LogInForm';
import * as authActions from './../store/actions/authActions';

function Login(props) {
	let history = useHistory();
	const [signingUp, setSigningUp] = useState(false);
	const [enteredEmail, setEnteredEmail] = useState(null);
	const [enteredPassword, setEnteredPassword] = useState(null);
	const { token } = props;

	const emailChangedHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const passwordChangedHandler = (event) => {
		setEnteredPassword(event.target.value);
	};

	const authFail = (err) => {
		alert(err);
		props.setIsLoading(false);
	};

	const authSuccess = (res) => {
		const userId = res.data.data.user._id;
		const token = res.data.token;
		props.setUserData(token, userId);
		props.setIsLoading(false);
		history.push('/home');
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		props.setIsLoading(true);
		const body = {
			email: enteredEmail,
			password: enteredPassword,
		};

		axios
			.post(`${links.apiUrl}/api/v1/users/login`, body)
			.then(function (response) {
				authSuccess(response);
			})
			.catch(function (error) {
				authFail(error);
			});
	};

	let content = null;
	if (!token) {
		content = (
			<LogInForm
				onEmailChanged={emailChangedHandler}
				onPasswordChanged={passwordChangedHandler}
				onFormSubmit={submitHandler}
				loading={props.isLoading}
				isSigningUp={signingUp}
			/>
		);
	} else {
		history.push('/home');
	}

	return content;
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
