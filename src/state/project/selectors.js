import { populateTask } from '../../logic/project';
import { compact } from 'lodash';

export const isTaskComplete = ( state, task ) => {
	const taskCompletedness = state.project.completion[ task ];
	if ( taskCompletedness ) {
		return ( taskCompletedness.architecture <= 0 &&
			taskCompletedness.design <= 0 &&
			taskCompletedness.product <= 0 &&
			taskCompletedness.frontend <= 0 &&
			taskCompletedness.backend <= 0
		);
	}
	return false;
};

export const getAverageCompletion = ( state, task ) => {
	const taskCompletedness = state.project.completion[ task ];
	if ( taskCompletedness ) {
		return Math.floor(
			(
				taskCompletedness.architecture +
				taskCompletedness.design +
				taskCompletedness.product +
				taskCompletedness.frontend +
				taskCompletedness.backend
			) / 5
		);
	}
	return false;
};

export const getAllProjectItems = ( state ) => {
	return state.project.items;
};

export const getFullTaskList = ( state ) => {
	return compact(
		state.project.items.map( ( task ) => {
			if ( ! isTaskComplete( state, task ) ) {
				const populatedTask = populateTask( task );
				return {
					...populatedTask,
					completion: Object.assign( {}, state.project.completion[ task ] ),
					averageCompletion: getAverageCompletion( state, task )
				};
			}
		} )
	);
};

export const getCompletedTaskList = ( state ) => {
	return compact(
		state.project.items.map( ( task ) => {
			if ( isTaskComplete( state, task ) ) {
				const populatedTask = populateTask( task );
				return {
					...populatedTask,
					completion: Object.assign( {}, state.project.completion[ task ] ),
					averageCompletion: getAverageCompletion( state, task )
				};
			}
		} )
	);
};

export const getTaskDetails = ( state, task ) => {
	const populatedTask = populateTask( task );
	return Object.assign( {},
		populatedTask,
		{
			quality: state.project.quality[ task ].quality,
			completion: Object.assign( {}, state.project.completion[ task ] ),
			averageCompletion: getAverageCompletion( state, task )
		}
	);
};
