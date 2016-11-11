import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createReduxStore } from './state';
import { renderWithReduxStore } from './lib/helpers';

const store = createReduxStore( {} );

renderWithReduxStore(
	React.createElement( App, {} ),
	document.body,
	store
);

