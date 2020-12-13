import React, { useEffect } from 'react';
import './styleThemes/main.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NoMatch from './components/MainViews/NoMatch';
import Home from './components/MainViews/Home';
import Login from './containers/Login';
import CreateRecipe from './components/MainViews/CreateRecipe';
import { theme } from './styleThemes/styleThemes';
import { ThemeProvider } from 'styled-components';
import Layout from './components/hoc/Layout';
import * as authActions from './store/actions/authActions';

function App(props) {
	const { loadAuthData } = props;

	const { token } = props;

	useEffect(() => {
		console.log(`[App.js] load auth data`);
		loadAuthData();
	}, [loadAuthData, token]);

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={Login} />
					<Switch>
						{props.token && (
							<React.Fragment>
								<Layout>
									<Route path='/home' component={Home} />
									<Route
										path='/createRecipe'
										component={CreateRecipe}
									/>
								</Layout>
							</React.Fragment>
						)}
						<Route component={NoMatch} />
					</Switch>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

const mapStateToProps = (state) => {
	return {
		token: state.authState.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadAuthData: (token, userId) =>
			dispatch({ type: authActions.LOAD_USER_DATA_FROM_STORAGE }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
