import { getEmployees, getEmployeeIds, getPersonById } from '../people/selectors';
import { getAllProjectItems } from '../project/selectors';
import { populateTask } from '../../logic/project';
import { compact } from 'lodash';

export const getPeopleAssignedToTask = ( state, task ) => {
	if ( ! state.work.assignments[ task ] ) {
		return [];
	}

	return state.work.assignments[ task ].map( ( personId ) => {
		return getPersonById( state, personId );
	} );
};

export const getPeopleNotAssignedToTask = ( state, task ) => {
	if ( ! state.work.assignments[ task ] ) {
		return getEmployees( state );
	}
	const employees = getEmployeeIds( state );
	return compact( employees.map( ( employeeId ) => {
		if ( state.work.assignments[ task ].indexOf( employeeId ) < 0 ) {
			return getPersonById( state, employeeId );
		}
		return null;
	} ) );
};

export const getPersonTasks = ( state, personId ) => {
	const taskList = getAllProjectItems( state );
	const assignedTasks = [];
	taskList.map( ( task ) => {
		if ( state.work.assignments[ task ] && state.work.assignments[ task ].indexOf( personId ) >= 0 ) {
			assignedTasks.push( populateTask( task ) );
		}
	} );
	return assignedTasks;
};
