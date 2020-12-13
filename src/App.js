import React, { useEffect } from 'react';
import './styleThemes/main.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './containers/Login';
import CreateRecipe from './components/MainViews/CreateRecipe';
import { theme } from './styleThemes/styleThemes';
import { ThemeProvider } from 'styled-components';
import Layout from './components/hoc/Layout';
import * as authActions from './store/actions/authActions';
import Home from './containers/Home';
import NoMatch from './components/NoMatch';
import ViewRecipe from './components/ViewRecipe';

function App(props) {
	const { loadAuthData } = props;

	const { token } = props;

	useEffect(() => {
		loadAuthData();
	}, [loadAuthData, token]);

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				{/* {token && <Redirect to='/home' />} */}
				<Switch>
					<Route path='/' exact component={Login} />

					{props.token && (
						<Layout>
							<Switch>
								<Route path='/home' component={Home} />
								<Route
									path='/createRecipe'
									component={CreateRecipe}
								/>
								<Route
									path='/viewRecipe'
									component={ViewRecipe}
								/>
								<Route component={NoMatch} />
							</Switch>
						</Layout>
					)}
					<Route component={NoMatch} />
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
