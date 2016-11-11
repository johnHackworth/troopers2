import { ADD_PERSON_TO_TASK, REMOVE_PERSON_FROM_TASK } from '../action-types';

export function assignPersonToTask( person, task ) {
	return ( dispatch ) => {
		dispatch( {
			type: ADD_PERSON_TO_TASK,
			person,
			task
		} );
	};
}

export function removePersonFromTask( person, task ) {
	return ( dispatch ) => {
		dispatch( {
			type: REMOVE_PERSON_FROM_TASK,
			person,
			task
		} );
	};
}
