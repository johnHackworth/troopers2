import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextTurn } from '../../logic/game';
import { changeScene } from '../../state/game/actions';
import Button from '../../components/button/index';

const MainBar = React.createClass( {
	displayName: 'MainBar',

	goToTeamScreen() {
		this.props.changeScene( 'team' );
	},

	goToProjectScreen() {
		this.props.changeScene( 'project' );
	},

	goToPeopleScreen() {
		this.props.changeScene( 'people' );
	},

	nextTurn() {
		this.props.nextTurn( this.props.state );
	},

	render() {
		return (
			<div className="mainBar">
				<Button compact onClick={ this.goToProjectScreen }>Project</Button>
				<Button compact onClick={ this.goToTeamScreen }>Team</Button>
				<Button compact onClick={ this.goToPeopleScreen }>People</Button>
				<Button compact primary scary onClick={ this.nextTurn } >Next Turn</Button>
			</div>
		);
	}
} );

export default connect(
	state => {
		return {
			state: state
		};
	},
	dispatch => bindActionCreators( {
		nextTurn: nextTurn,
		changeScene: changeScene
	}, dispatch )
)( MainBar );
