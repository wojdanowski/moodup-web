import React from 'react';
import Container from 'react-bootstrap/Container';
import { withRouter } from 'react-router-dom';
import NavigationBar from './../NavigationBar';
import { connect } from 'react-redux';

function Layout(props) {
	const NavigationWithRouter = withRouter(NavigationBar);

	return (
		<React.Fragment>
			<NavigationWithRouter />
			<Container>{props.children}</Container>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		token: state.authState.token,
	};
};

export default connect(mapStateToProps, null)(Layout);
