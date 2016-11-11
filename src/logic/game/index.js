import { CREATE_PEOPLE, NEXT_TURN, START_GAME } from '../../state/action-types';
import { generatePeople, hirePerson, peopleNextTurn } from '../people';
import { projectNextTurn } from '../project';

const PEOPLE_AMOUNT = 100;

export function createGame() {
	return ( dispatch ) => {
		const people = generatePeople( PEOPLE_AMOUNT );
		dispatch( {
			type: CREATE_PEOPLE,
			people
		} );
		for ( let i = 0; i < 2; i++ ) {
			hirePerson( i )( dispatch );
		}

		dispatch( {
			type: START_GAME
		} );
	};
}

export function nextTurn( state ) {
	return ( dispatch ) => {
		dispatch( {
			type: NEXT_TURN
		} );

//		peopleNextTurn( state )( dispatch );
		projectNextTurn( state )( dispatch );
	};
}

