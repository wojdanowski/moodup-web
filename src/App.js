import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoMatch from './components/MainViews/NoMatch';
import Home from './components/MainViews/Home';
import Login from './components/containers/Login';
import CreateRecipe from './components/MainViews/CreateRecipe';
import Layout from './components/MainViews/hoc/Layout';
import { theme } from './styleThemes/styleThemes';
import { ThemeProvider } from 'styled-components';

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
