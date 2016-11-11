import { combineReducers } from 'redux';
import { SERIALIZE, DESERIALIZE, GAME_FREEZE, GAME_UNFREEZE, SCENE_CHANGE, NEXT_TURN } from '../action-types';
const defaultState = {
	freeze: false,
	scene: 'initial',
	turn: 1,
	selectedItem: null
};

export function gameReducer( state = defaultState, action ) {
	switch ( action.type ) {
		case NEXT_TURN:
		console.log(1);
			return Object.assign( {}, state, { turn: ++state.turn } );
		case GAME_FREEZE:
			return Object.assign( {}, state, { freeze: true } );
		case GAME_UNFREEZE:
			return Object.assign( {}, state, { freeze: false } );
		case SCENE_CHANGE:
			return Object.assign( {}, state, { scene: action.scene, selectedItem: action.item } );
		case SERIALIZE:
		case DESERIALIZE:
			return state;
	}
	return state;
}

export default combineReducers( {
	gameReducer
} );
