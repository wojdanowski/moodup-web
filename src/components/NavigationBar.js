import React from 'react';
// import { useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
	background-color: ${(props) => props.theme.mainColor};
`;

const Styles = styled.div`
	& .navbar {
		color: white;

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
	// const history = useHistory();

	return (
		<StyledContainer fluid>
			<Container>
				<Styles>
					<Navbar expand='lg'>
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
											props.history.push('/CreateRecipe');
										}}
									>
										Create Recipe
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										onClick={() => props.history.push('/')}
									>
										LogIn
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</Styles>
			</Container>
		</StyledContainer>
	);
}

export default NavigationBar;
