import React from 'react';
import './components/style.css';
import { connect } from 'react-redux';

import SceneIntro from './scenes/intro';
import SceneTeam from './scenes/team';
import SceneProject from './scenes/project';
import SceneTask from './scenes/project/task';
import ScenePerson from './scenes/team/person';
import ScenePeople from './scenes/people';


const App = React.createClass( {
	getCurrentScene() {
		if ( this.props.scene === 'game' ) {
			return <SceneTeam />;
		}
		if ( this.props.scene === 'team' ) {
			return <SceneTeam />;
		}
		if ( this.props.scene === 'project' ) {
			return <SceneProject />;
		}
		if ( this.props.scene === 'task' ) {
			return <SceneTask />;
		}
		if ( this.props.scene === 'person' ) {
			return <ScenePerson />;
		}
		if ( this.props.scene === 'people' ) {
			return <ScenePeople />;
		}
		return <SceneIntro />;
	},
	render() {
		return (
			<div className="App">
				{ this.getCurrentScene() }
			</div>
		);
	}
} );

export default connect(
	state => {
		return {
			isFreezed: state.game.freeze,
			scene: state.game.scene
		};
	}
)( App );
