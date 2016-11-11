import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskView from '../../../lib/taskView';
import MainBar from '../../../lib/mainBar';

const SceneTeam = React.createClass( {
	displayName: 'SceneProject',

	render() {
		return (
			<div className="task scene">
				<MainBar />
				<TaskView taskSlug={ this.props.taskSlug } />
			</div>
		);
	}
} );

export default connect(
	state => {
		return {
			isFreezed: state.game.freeze,
			taskSlug: state.game.selectedItem
		};
	}
)( SceneTeam );
