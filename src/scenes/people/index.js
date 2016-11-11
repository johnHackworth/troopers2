import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../../components/button';
import Gridicon from '../../components/gridicon';
import actions from './actions';
import PeopleList from '../../lib/peopleList';
import MainBar from '../../lib/mainBar';

const SceneTeam = React.createClass( {
	displayName: 'RecruitScene',

	render() {
		return (
			<div className="recruit scene">
				<MainBar />
				<PeopleList />
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
