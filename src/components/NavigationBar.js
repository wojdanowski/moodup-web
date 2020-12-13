import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as authActions from './../store/actions/authActions';

const StyledContainer = styled(Container)`
	background-color: ${(props) => props.theme.mainColor};
`;

const Styles = styled.div`
	& .navbar {
		color: white;

		& button.navbar-toggler {
			border: 2px solid transparent;
			outline: none;

			&:hover {
				border: 2px solid ${(props) => props.theme.secondaryColor};
			}
		}

		& .navbar-brand,
		.navbar-nav .nav-item .nav-link {
			color: white;

			&:hover {
				color: ${(props) => props.theme.secondaryColor};
			}
		}
	}
`;

function NavigationBar(props) {
	const logoutHandler = () => {
		props.setUserData(null, null);
		props.history.push('/');
	};

	return (
		<React.Fragment>
			<StyledContainer fluid>
				<Container>
					<Styles>
						<Navbar expand='lg' className='navbar-dark'>
							<Navbar.Brand href='/'>MoodUp</Navbar.Brand>
							<Navbar.Toggle aria-controls='basic-navbar-nav' />
							<Navbar.Collapse id='basic-navbar-nav'>
								<Nav className='ml-auto'>
									<Nav.Item>
										<Nav.Link
											onClick={() =>
												props.history.push('/home')
											}
										>
											Home
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link
											onClick={(event) => {
												props.history.push(
													'/CreateRecipe'
												);
											}}
										>
											Create Recipe
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link onClick={logoutHandler}>
											LogOut
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</Navbar.Collapse>
						</Navbar>
					</Styles>
				</Container>
			</StyledContainer>
		</React.Fragment>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		setUserData: (token, userId) =>
			dispatch({ type: authActions.SET_USER_DATA, token, userId }),
	};
};

export default connect(null, mapDispatchToProps)(NavigationBar);
