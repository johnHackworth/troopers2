import { CHANGE_WORK } from '../../state/action-types';
import { taskTree, taskDetails } from './schema';
import { diceThrow } from '../../lib/helpers';
import { isTaskComplete, getAverageCompletion } from '../../state/project/selectors';
import { getPersonWorkInArea } from '../people';
import { getPersonById } from '../../state/people/selectors';

const areas = {
	architecture: false,
	frontend: false,
	backend: false,
	design: false,
	product: false
};

const isTaskAvailable = ( task, state ) => {
	let everyRequirementReady = true;
	taskTree[ task ].forEach( ( requirement ) => {
		everyRequirementReady = everyRequirementReady && isTaskComplete( state, requirement );
	} );
	return everyRequirementReady;
};

export const addAvailableTasks = function( state ) {
	const availableTasks = Object.keys( taskTree ).filter( ( task ) => {
		if ( isTaskAvailable( task, { project: state } ) ) {
			return state.items.indexOf( task ) < 0;
		}
		return false;
	} );
	return availableTasks;
	// state.tasks.items
};

export const populateTask = function( task ) {
	return {
		...taskDetails[ task ],
		id: task
	};
};

export const canPersonWorkAtArea = function( state, personId, area ) {
	return true;
};

export const getPersonsWorkingInTask = function( state, people, task ) {
	const work = [];
	people.map( ( person ) => {
		if ( canPersonWorkAtArea( state, person, task ) ) {
			work.push( person );
		}
	} );
	return work;
};

export const getPersonWork = function( state, personId ) {
	const work = {};
	let exitMap = false;
	Object.keys( areas ).map( ( area ) => {
		if ( exitMap ) {
			return;
		}
		work[ area ] = getPersonWorkInArea( state, personId, area );
		if ( work[ area ] > 0 ) {
			const person = getPersonById( state, personId );
			if ( diceThrow( 100 ) > person.workEthics ) {
				exitMap = true;
			}
		}
	} );
	console.log(work);
	return work;
};

export function projectNextTurn( state ) {
	return ( dispatch ) => {
		Object.keys( state.work.assignments ).map( ( task ) => {
			const taskState = Object.assign( {}, state.work.assignments[ task ] );
			const persons = getPersonsWorkingInTask( state, state.work.assignments[ task ], task );

			const maxWorkInTask = Object.assign( {}, areas );
			persons.forEach( ( personId ) => {
				const work = getPersonWork( state, personId );
				Object.keys( areas ).map( ( area ) => {
					if ( maxWorkInTask[ area ] < work[ area ] ) {
						maxWorkInTask[ area ] = work[ area ];
					}
				} );
			} );
			dispatch( {
				type: CHANGE_WORK,
				task,
				work: maxWorkInTask
			} );
		} );
	};
};

export function getInitialQualityData( task ) {
	return {
		totalPoints: 0,
		totalQuality: 0,
		quality: 0
	};
}