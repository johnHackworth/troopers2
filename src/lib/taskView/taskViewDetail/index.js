import './styles.css';
import React from 'react';
import Card from '../../../components/card';
import ProgressBar from '../../../components/progress-bar';
import Gridicon from '../../../components/gridicon';
import { changeScene } from '../../../state/game/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const TaskViewDetail = React.createClass( {
	displayName: 'taskViewDetail',

	goToTask() {
		this.props.changeScene( 'task', this.props.task.id );
	},

	icons: {
		frontend: 'code',
		design: 'customize',
		architecture: 'layout-blocks',
		backend: 'cloud',
		product: 'caption',
	},

	getAreaIcon( area ) {
		return <Gridicon icon={ this.icons[ area ] } size={ 26 }/>;
	},

	renderProgress( area ) {
		return (
			<div className="taskViewDetail__progress">
				<div className="taskViewDetail__progress-name">{ area } { this.getAreaIcon( area ) }</div>
				<ProgressBar value={ this.props.task.completion[ area ] } />
			</div>
		);
	},

	render() {
		return (
			<Card className="taskViewDetail" compact onClick={ this.goToTask }>
				<div className="taskViewDetail__name"> { this.props.task.title } </div>
				<div className="taskViewDetail__description"> { this.props.task.description } </div>
				<div className="taskViewDetail__completion">
					{ this.renderProgress( 'product' ) }
					{ this.renderProgress( 'architecture' ) }
					{ this.renderProgress( 'design' ) }
					{ this.renderProgress( 'backend' ) }
					{ this.renderProgress( 'frontend' ) }
				</div>
				<div className="taskViewDetail__quality">
					<div className="taskViewDetail__progress">
						<div className="taskViewDetail__progress-name">Quality</div>
						<ProgressBar value={ this.props.task.quality } />
					</div>
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
)( TaskViewDetail );
