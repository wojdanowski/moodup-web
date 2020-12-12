import React from 'react';
import Container from 'react-bootstrap/Container';
import { withRouter } from 'react-router-dom';
import NavigationBar from './../NavigationBar';

function Layout(props) {
	const NavigationWithRouter = withRouter(NavigationBar);

	return (
		<Container>
			<NavigationWithRouter />
			{props.children}
		</Container>
	);
}

export default Layout;
