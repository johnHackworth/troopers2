import { combineReducers } from 'redux';
import { ADD_NEW_ISSUE, NEXT_TURN, START_GAME, CHANGE_WORK } from '../action-types';
import { addAvailableTasks } from '../../logic/project';
import { populateTask, getInitialQualityData } from '../../logic/project';

const defaultState = {
	items: [],
	completion: {},
	quality: {}
};

export function projectReducer( state = defaultState, action ) {
	switch ( action.type ) {
		case ADD_NEW_ISSUE:
			return Object.assign( {}, state, { items: [ ...state.items, action.task ] } );

		case CHANGE_WORK:
			const currentCompletion = Object.assign( {}, state.completion );
			const currentQuality = Object.assign( {}, state.quality );
			Object.keys( currentCompletion[ action.task ] ).map( ( area ) => {
				if ( action.work[ area ] > 0 ) {
					currentCompletion[ action.task ][ area ] -= 1;

					const newTotalQuality = currentQuality[ action.task ].totalQuality + action.work[ area ];
					const newTotalPoints = currentQuality[ action.task ].totalPoints + 1;
					const newQuality = newTotalQuality / newTotalPoints;

					if ( currentCompletion[ action.task ] < 0 ) {
						currentCompletion[ action.task ] = 0;

						if ( newQuality > currentQuality[ action.task ].quality ) {
							currentQuality[ action.task ].totalQuality = newTotalQuality;
							currentQuality[ action.task ].totalPoints = newTotalPoints;
							currentQuality[ action.task ].quality = newQuality;
						}
					} else {
						currentQuality[ action.task ].totalQuality = newTotalQuality;
						currentQuality[ action.task ].totalPoints = newTotalPoints;
						currentQuality[ action.task ].quality = newQuality;
					}
				}
			} );
			return Object.assign( {}, state, {
				completion: { ...state.completion, ...currentCompletion },
				quality: { ...state.quality, ...currentQuality }
			} );

		case START_GAME:
		case NEXT_TURN: // add new tasks
			const newTasks = addAvailableTasks( state );
			const newCompletionStates = {};
			const newQualityStates = {};
			newTasks.forEach( ( task ) => {
				const { architecture, design, product, frontend, backend } = populateTask( task );
				newCompletionStates[ task ] = {
					architecture,
					design,
					product,
					frontend,
					backend
				};

				newQualityStates[ task ] = getInitialQualityData( task );
			} );
			return Object.assign( {}, state, {
				items: [ ...state.items, ...newTasks ],
				completion: { ...state.completion, ...newCompletionStates },
				quality: { ...state.quality, ...newQualityStates }
			} );

	}
	return state;
}

export default combineReducers( {
	projectReducer
} );
