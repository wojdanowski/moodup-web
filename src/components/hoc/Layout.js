import React from 'react';
import Container from 'react-bootstrap/Container';
import { withRouter } from 'react-router-dom';
import NavigationBar from './../NavigationBar';

function Layout(props) {
	const NavigationWithRouter = withRouter(NavigationBar);

	return (
		<React.Fragment>
			<NavigationWithRouter />
			<Container>{props.children}</Container>
		</React.Fragment>
	);
}

export default Layout;
