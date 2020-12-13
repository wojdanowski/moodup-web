import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from './store/reducers/authReducer';
import recipeReducer from './store/reducers/recipeReducer';

const rootReducer = combineReducers({
	authState: authReducer,
	recipeState: recipeReducer,
});

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
