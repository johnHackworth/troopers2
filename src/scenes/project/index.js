import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../../components/button';
import Gridicon from '../../components/gridicon';
import ScrumBoard from '../../lib/scrumBoard';
import MainBar from '../../lib/mainBar';

const SceneTeam = React.createClass( {
	displayName: 'SceneProject',

	render() {
		return (
			<div className="project scene">
				<MainBar />
				<ScrumBoard />
			</div>
		);
	}
} );

export default connect(
	state => {
		return {
			isFreezed: state.game.freeze,
		};
	}
)( SceneTeam );
