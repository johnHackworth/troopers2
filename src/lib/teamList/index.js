import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEmployees } from '../../state/people/selectors';
import TeamListItem from './listItem';

const TeamList = React.createClass( {
	displayName: 'TeamList',

	renderTeam() {
		return this.props.company.map( ( person ) => {
			return (
				<TeamListItem person={ person } />
			);
		} );
	},

	render() {
		return (
			<div className="teamList">
				{ this.renderTeam() }
			</div>
		);
	}
} );

export default connect(
	state => {
		return {
			company: getEmployees( state )
		};
	}
)( TeamList );
