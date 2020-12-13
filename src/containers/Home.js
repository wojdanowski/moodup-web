import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Loader from './../components/uiElements/Loader';
import axios from './../utils/axios';
import { connect } from 'react-redux';
import foodImg from './../assets/img/food_tc.jpg';

function Home(props) {
	const [shouldFetch, setShouldFetch] = useState(true);
	const [recipes, setRecipes] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { token } = props;

	const onSuccess = (res) => {
		setRecipes(res.data.data.data);
		setIsLoading(false);
		console.log(res);
	};

	const onFail = (err) => {
		setIsLoading(false);
		alert(err);
	};

	useEffect(() => {
		if (shouldFetch && token) {
			setIsLoading(true);
			axios
				.get('/api/v1/recipes/', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(function (response) {
					onSuccess(response);
				})
				.catch(function (error) {
					onFail(error);
				});
			setShouldFetch(false);
		}
	}, [shouldFetch, token]);

	let content;
	if (isLoading && !recipes) {
		content = (
			<Container
				fluid
				className='d-flex min-vh-100 justify-content-center align-items-center'
			>
				<Loader />
			</Container>
		);
	} else if (recipes) {
		content = (
			<React.Fragment>
				<Container fluid>
					<h2>Latest Recipes</h2>
					<Row xs={1} sm={1} md={3}>
						{recipes.map((recipe) => (
							<Col key={recipe.id}>
								<Card className='mb-3 border-0'>
									<Card.Img
										src={foodImg}
										className='rounded '
									/>
									<Card.ImgOverlay className='with-gradient rounded'></Card.ImgOverlay>
									<Card.ImgOverlay>
										<Card.Body className='d-flex h-100 flex-column justify-content-end'>
											<Card.Text className='text-basicGrey'>
												{recipe.prepTime}
											</Card.Text>
											<Card.Title className='text-basicWhite'>
												{recipe.name}
											</Card.Title>
										</Card.Body>
									</Card.ImgOverlay>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</React.Fragment>
		);
	}

	return <div>{content}</div>;
}

const mapStateToProps = (state) => {
	return {
		token: state.authState.token,
	};
};

export default connect(mapStateToProps, null)(Home);
