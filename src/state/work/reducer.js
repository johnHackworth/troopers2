import { combineReducers } from 'redux';
import { ADD_PERSON_TO_TASK, REMOVE_PERSON_FROM_TASK, NEXT_TURN } from '../action-types';
const defaultState = {
	assignments: {

	}
};

export function workReducer( state = defaultState, action ) {
	let assignedPersons, newAssigments;
	switch ( action.type ) {
		case ADD_PERSON_TO_TASK:
			assignedPersons = [ ...state.assignments[ action.task ] || [] ];
			if ( assignedPersons.indexOf( action.person ) < 0 ) {
				assignedPersons.push( action.person );
			}
			newAssigments = {
				...state.assignments
			};
			newAssigments[ action.task ] = assignedPersons;
			return Object.assign( {}, state, { assignments: newAssigments } );
		case REMOVE_PERSON_FROM_TASK:
			assignedPersons = [ ...state.assignments[ action.task ] || [] ];
			if ( assignedPersons.indexOf( action.person ) >= 0 ) {
				assignedPersons.splice( assignedPersons.indexOf( action.person ), 1 );
			}
			newAssigments = {
				...state.assignments
			};
			newAssigments[ action.task ] = assignedPersons;
			return Object.assign( {}, state, { assignments: newAssigments } );
		case NEXT_TURN:
			const workingInto = {};
			return state;
	}
	return state;
}

export default combineReducers( {
	workReducer
} );
