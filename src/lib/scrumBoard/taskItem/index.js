import './styles.css';
import React from 'react';
import Card from '../../../components/card';
import ProgressBar from '../../../components/progress-bar';
import { changeScene } from '../../../state/game/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const TaskItem = React.createClass( {
	displayName: 'taskItem',

	goToTask() {
		this.props.changeScene( 'task', this.props.task.id );
	},

	render() {
		return (
			<Card className="taskItem" compact onClick={ this.goToTask }>
				<div className="taskItem__name"> { this.props.task.title } </div>
				<div className="taskItem__description"> { this.props.task.description } </div>
				<div className="taskItem__completion">
					<ProgressBar value={ this.props.task.averageCompletion } is-compact />
				</div>
			</Card>
		);
	}
} );

export default connect(
	state => {
		return {};
	},
	dispatch => bindActionCreators( {
		changeScene: changeScene
	}, dispatch )
)( TaskItem );
