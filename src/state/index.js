import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

import { gameReducer } from './game/reducer';
import { peopleReducer } from './people/reducer';
import { projectReducer } from './project/reducer';
import { workReducer } from './work/reducer';


export const reducer = combineReducers( {
	game: gameReducer,
	people: peopleReducer,
	project: projectReducer,
	work: workReducer
} );

const middleware = [ thunkMiddleware ];

let createStoreWithMiddleware = applyMiddleware.apply( null, middleware );

export function createReduxStore( initialState = {} ) {
	if (
		window &&
		window.devToolsExtension
	) {
		createStoreWithMiddleware = compose( createStoreWithMiddleware, window.devToolsExtension() );
	}
	return createStoreWithMiddleware( createStore )( reducer, initialState );
}
