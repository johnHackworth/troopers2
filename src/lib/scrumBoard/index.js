import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { getFullTaskList, getCompletedTaskList } from '../../state/project/selectors';
import Column from './column';

const ScrumBoard = React.createClass( {
	displayName: 'TeamList',

	render() {
		return (
			<div className="scrumBoard">
				<Column tasks={ this.props.completedTasks } title={ 'Completed Tasks' } />
				<Column tasks={ this.props.availableTasks } title={ 'Available Tasks' } />
				<Column tasks={ this.props.futureTasks } title={ 'Next Tasks' } />
			</div>
		);
	}
} );

export default connect(
	state => {
		return {
			availableTasks: getFullTaskList( state ),
			completedTasks: getCompletedTaskList( state ),
			futureTasks: []
		};
	}
)( ScrumBoard );
