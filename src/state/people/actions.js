import { TOGGLE_PERSON_AREA } from '../action-types';

export function togglePersonArea( personId, area, allowed ) {
	return ( dispatch ) => {
		dispatch( {
			type: TOGGLE_PERSON_AREA,
			personId,
			area,
			allowed
		} );
	};
}
