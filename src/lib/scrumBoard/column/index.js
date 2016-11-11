import './styles.css';
import React from 'react';
import TaskItem from '../taskItem';
import Card from '../../../components/card';

export default React.createClass( {
	displayName: 'scrumBoardColumn',

	renderTask( task ) {
		return (
			<TaskItem task={ task } key={ task.id } />
		);
	},

	renderTasks() {
		return this.props.tasks.map( this.renderTask );
	},

	render() {
		return (
			<Card className="column">
				<div className="column__title">{ this.props.title }</div>
				<div className="column__tasks">{ this.renderTasks() }</div>
			</Card>
		);
	}
} );
