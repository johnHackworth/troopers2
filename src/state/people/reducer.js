import { combineReducers } from 'redux';
import { SERIALIZE, DESERIALIZE, CREATE_PEOPLE, HIRE_PERSON, CHANGE_HAPPINESS, TOGGLE_PERSON_AREA } from '../action-types';
const defaultState = {
	items: [],
	company: [],
	allowedAreas: {}
};

export function peopleReducer( state = defaultState, action ) {
	let person;
	switch ( action.type ) {
		case TOGGLE_PERSON_AREA:
			const newAllowedAreas = Object.assign( {}, state.allowedAreas );
			newAllowedAreas[ action.personId ] = newAllowedAreas[ action.personId ] || {};
			newAllowedAreas[ action.personId ][ action.area ] = action.allowed;
			return Object.assign( {}, state, { allowedAreas: { ...newAllowedAreas } } );

		case CREATE_PEOPLE:
			return Object.assign( {}, state, { items: action.people } );

		case HIRE_PERSON:
			person = state.items[ action.id ];
			if ( ! person.isInPlayerCompany ) {
				person.isInPlayerCompany = true;
				return Object.assign( {},
					state,
					{
						items: [ ...state.items.slice( 0, action.id ), person, ...state.items.slice( action.id + 1 ) ],
						company: [ ...state.company, action.id ]
					}
				);
			}
			return state;

		case CHANGE_HAPPINESS:
			person = Object.assign( {}, state.items[ action.id ] );
			person.happiness += action.happiness || 0;
			return Object.assign( {},
				state,
				{
					items: [ ...state.items.slice( 0, action.id ), person, ...state.items.slice( action.id + 1 ) ],
				}
			);
			return state;

		case SERIALIZE:
		case DESERIALIZE:
			return state;
	}
	return state;
}

export default combineReducers( {
	peopleReducer
} );
