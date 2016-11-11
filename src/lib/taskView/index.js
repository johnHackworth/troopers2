import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { getTaskDetails } from '../../state/project/selectors';
import { getPeopleAssignedToTask, getPeopleNotAssignedToTask } from '../../state/work/selectors';
import TaskViewDetail from './taskViewDetail';
import AssignedPeople from './assignedPeople';
import AvailablePeople from './availablePeople';

const ScrumBoard = React.createClass( {
	displayName: 'TaskView',

	render() {
		return (
			<div className="taskView">
				<TaskViewDetail task={ this.props.taskDetails } />
				<div className="taskView__people">
					<AssignedPeople task={ this.props.taskSlug } persons={ this.props.assignedPeople } />
					<AvailablePeople task={ this.props.taskSlug } persons={ this.props.availablePeople } />
				</div>
			</div>
		);
	}
} );

export default connect(
	state => {
		return {
			taskDetails: getTaskDetails( state, state.game.selectedItem ),
			assignedPeople: getPeopleAssignedToTask( state, state.game.selectedItem ),
			availablePeople: getPeopleNotAssignedToTask( state, state.game.selectedItem )
		};
	}
)( ScrumBoard );
