import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styleThemes/custom.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoMatch from './components/MainViews/NoMatch';
import Home from './components/MainViews/Home';
import Login from './containers/Login';
import CreateRecipe from './components/MainViews/CreateRecipe';
import { theme } from './styleThemes/styleThemes';
import { ThemeProvider } from 'styled-components';
import Layout from './components/hoc/Layout';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={Login} />
					<Layout>
						<Switch>
							<Route path='/home' component={Home} />
							<Route
								path='/createRecipe'
								component={CreateRecipe}
							/>
							<Route component={NoMatch} />
						</Switch>
					</Layout>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
