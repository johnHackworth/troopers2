import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../../components/button';
import Gridicon from '../../components/gridicon';
import actions from './actions';
import TeamList from '../../lib/teamList';
import MainBar from '../../lib/mainBar';

const SceneTeam = React.createClass( {
	displayName: 'SceneTeam',

	render() {
		return (
			<div className="team scene">
				<MainBar />
				<TeamList />
			</div>
		);
	}
} );

export default connect(
	state => {
		return {
			isFreezed: state.game.freeze,
		};
	},
	dispatch => bindActionCreators( actions, dispatch )
)( SceneTeam );
