import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Loader from './../components/uiElements/Loader';
import axios from './../utils/axios';
import { connect } from 'react-redux';

function Home(props) {
	const [shouldFetch, setShouldFetch] = useState(true);
	const [recipes, setRecipes] = useState(null);
	const { token } = props;

	const onSuccess = (res) => {
		setRecipes(res.data.data.data);
		console.log(res);
	};

	const onFail = (err) => {
		alert(err);
	};

	useEffect(() => {
		if (shouldFetch && token) {
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

	return (
		<React.Fragment>
			<Button variant='outline-primary'>some button</Button>
			<h1>home </h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ad
				non modi, molestias eveniet perspiciatis sapiente iste libero
				laborum, excepturi porro amet vitae, totam obcaecati vel.
				Provident quisquam nihil expedita?
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Adipisci maxime aliquid eos repudiandae ea repellendus tempore
				accusamus quas consequuntur qui. Aperiam assumenda tempore rerum
				voluptatum similique a, quam nulla, facere ipsa mollitia
				distinctio, doloribus culpa! Possimus rem quibusdam quisquam
				aperiam voluptatibus sequi corrupti praesentium eaque deserunt
				adipisci? Molestiae, minima mollitia, neque impedit suscipit
				sint dolorem culpa, cum tempora pariatur velit recusandae?
				Similique at laborum consectetur omnis ipsum obcaecati aperiam,
				error blanditiis? Quo enim placeat adipisci possimus dignissimos
				corporis aliquid non quibusdam nam. Aliquam quas temporibus
				incidunt ex sed, praesentium accusantium minima saepe porro
				placeat vero exercitationem quos, magni distinctio dolores.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Adipisci maxime aliquid eos repudiandae ea repellendus tempore
				accusamus quas consequuntur qui. Aperiam assumenda tempore rerum
				voluptatum similique a, quam nulla, facere ipsa mollitia
				distinctio, doloribus culpa! Possimus rem quibusdam quisquam
				aperiam voluptatibus sequi corrupti praesentium eaque deserunt
				adipisci? Molestiae, minima mollitia, neque impedit suscipit
				sint dolorem culpa, cum tempora pariatur velit recusandae?
				Similique at laborum consectetur omnis ipsum obcaecati aperiam,
				error blanditiis? Quo enim placeat adipisci possimus dignissimos
				corporis aliquid non quibusdam nam. Aliquam quas temporibus
				incidunt ex sed, praesentium accusantium minima saepe porro
				placeat vero exercitationem quos, magni distinctio dolores.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Adipisci maxime aliquid eos repudiandae ea repellendus tempore
				accusamus quas consequuntur qui. Aperiam assumenda tempore rerum
				voluptatum similique a, quam nulla, facere ipsa mollitia
				distinctio, doloribus culpa! Possimus rem quibusdam quisquam
				aperiam voluptatibus sequi corrupti praesentium eaque deserunt
				adipisci? Molestiae, minima mollitia, neque impedit suscipit
				sint dolorem culpa, cum tempora pariatur velit recusandae?
				Similique at laborum consectetur omnis ipsum obcaecati aperiam,
				error blanditiis? Quo enim placeat adipisci possimus dignissimos
				corporis aliquid non quibusdam nam. Aliquam quas temporibus
				incidunt ex sed, praesentium accusantium minima saepe porro
				placeat vero exercitationem quos, magni distinctio dolores.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Adipisci maxime aliquid eos repudiandae ea repellendus tempore
				accusamus quas consequuntur qui. Aperiam assumenda tempore rerum
				voluptatum similique a, quam nulla, facere ipsa mollitia
				distinctio, doloribus culpa! Possimus rem quibusdam quisquam
				aperiam voluptatibus sequi corrupti praesentium eaque deserunt
				adipisci? Molestiae, minima mollitia, neque impedit suscipit
				sint dolorem culpa, cum tempora pariatur velit recusandae?
				Similique at laborum consectetur omnis ipsum obcaecati aperiam,
				error blanditiis? Quo enim placeat adipisci possimus dignissimos
				corporis aliquid non quibusdam nam. Aliquam quas temporibus
				incidunt ex sed, praesentium accusantium minima saepe porro
				placeat vero exercitationem quos, magni distinctio dolores.
			</p>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		token: state.authState.token,
	};
};

export default connect(mapStateToProps, null)(Home);
