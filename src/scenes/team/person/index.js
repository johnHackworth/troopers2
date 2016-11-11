import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PersonView from '../../../lib/personView';
import MainBar from '../../../lib/mainBar';

const ScenePerson = React.createClass( {
	displayName: 'ScenePerson',

	render() {
		return (
			<div className="task scene">
				<MainBar />
				<PersonView personId={ this.props.personId } />
			</div>
		);
	}
} );

export default connect(
	state => {
		return {
			isFreezed: state.game.freeze,
			personId: state.game.selectedItem
		};
	}
)( ScenePerson );
