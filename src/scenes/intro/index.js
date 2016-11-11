import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { freezeGame, changeScene } from '../../state/game/actions';
import Button from '../../components/button/index';
import Gridicon from '../../components/gridicon/index';
import { createGame } from '../../logic/game';

const SceneIntro = React.createClass( {
	displayName: 'SceneIntro',

	freeze() {
		this.props.freezeGame( 2000 );
	},

	initGame() {
		this.props.createGame();
		this.props.changeScene( 'game' );
	},

	render() {
		return (
			<div className="intro scene">
				hola.
				<div>
					Is freezed? { this.props.isFreezed ? 'true' : 'false' }
				</div>
				<div>
					<Button onClick={ this.initGame }> Init Game </Button>
					<Gridicon icon="help" />
				</div>
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
	dispatch => bindActionCreators( {
		freezeGame: freezeGame,
		changeScene: changeScene,
		createGame: createGame
	}, dispatch )
)( SceneIntro );
