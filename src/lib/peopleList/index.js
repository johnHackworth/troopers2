import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPeople } from '../../state/people/selectors';
import TeamListItem from '../teamList/listItem';

const PeopleList = React.createClass( {
	displayName: 'PeopleList',

	renderTeam() {
		return this.props.people.map( ( person ) => {
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
			people: getPeople( state )
		};
	}
)( PeopleList );
