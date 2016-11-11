import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Person from '../peopleView';
import Card from '../../../components/card';
import { removePersonFromTask } from '../../../state/work/actions';

const TeamList = React.createClass( {
	displayName: 'taskAssignedPeople',

	unassignPerson( person ) {
		this.props.removePersonFromTask( person.id, this.props.task );
	},

	renderTeam() {
		return this.props.persons.map( ( person ) => {
			return (
				<Person person={ person } clickCallback={ this.unassignPerson } />
			);
		} );
	},

	render() {
		return (
			<Card className="taskAssignedPeople">
				{ this.renderTeam() }
			</Card>
		);
	}
} );

export default connect(
	state => { return {} },
	dispatch => bindActionCreators( {
		removePersonFromTask
	}, dispatch )
)( TeamList );
