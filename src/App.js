import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoMatch from './components/MainViews/NoMatch';
import Home from './components/MainViews/Home';
import Login from './components/MainViews/Login';
import CreateRecipe from './components/MainViews/CreateRecipe';
import Layout from './components/MainViews/hoc/Layout';
import NavigationBar from './components/NavigationBar';
import { theme } from './styleThemes/styleThemes';
import { ThemeProvider } from 'styled-components';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<NavigationBar />
			<Layout>
				<BrowserRouter>
					<Switch>
						<Route path='/' exact component={Login} />
						<Route path='/home' component={Home} />
						<Route path='/createRecipe' component={CreateRecipe} />
						<Route component={NoMatch} />
					</Switch>
				</BrowserRouter>
			</Layout>
		</ThemeProvider>
	);
}

export default App;
