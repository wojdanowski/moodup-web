import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function NoMatch() {
	const history = useHistory();
	return (
		<div>
			<h1>404 - Not found</h1>
			<Button variant='outline-primary' onClick={() => history.push('/')}>
				Go Home
			</Button>
		</div>
	);
}

export default NoMatch;
