import React from 'react';
import foodImg from './../assets/img/food_tc.jpg';
import Card from 'react-bootstrap/Card';

const RecipeCard = (props) => {
	return (
		<Card className='mb-3 border-0'>
			<Card.Img src={foodImg} className='rounded ' />
			<Card.ImgOverlay className='with-gradient rounded'></Card.ImgOverlay>
			<Card.ImgOverlay>
				<Card.Body className='d-flex h-100 flex-column justify-content-end'>
					<Card.Text className='text-basicGrey'>
						{props.recipe.prepTime}
					</Card.Text>
					<Card.Title className='text-basicWhite'>
						<h4>{props.recipe.name}</h4>
					</Card.Title>
				</Card.Body>
			</Card.ImgOverlay>
		</Card>
	);
};

export default RecipeCard;
