import React from 'react';
import Card from 'react-bootstrap/Card';

const RecipeCard = (props) => {
	return (
		<Card className='mb-3 border-0'>
			<Card.Img src={props.recipe.image} className='rounded ' />
			<Card.ImgOverlay className='with-gradient rounded'></Card.ImgOverlay>
			<Card.ImgOverlay>
				<Card.Body className='d-flex h-100 flex-column justify-content-end py-2'>
					<Card.Text className='text-basicGrey'>{props.recipe.prepTime}</Card.Text>
					<Card.Title className='text-basicWhite my-0'>
						<h4>{props.recipe.name}</h4>
					</Card.Title>
				</Card.Body>
			</Card.ImgOverlay>
		</Card>
	);
};

export default RecipeCard;
