import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const Styles = styled.div`
	// & button {
	// 	background-color: red;
	// }
`;

function CustomButton(props) {
	return (
		<Styles>
			<Button variant='outline-secondary'>{props.children}</Button>
		</Styles>
	);
}

export default CustomButton;
