import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { assignPersonToTask } from '../../../state/work/actions';
import Person from '../peopleView';
import Card from '../../../components/card';

const TeamList = React.createClass( {
	displayName: 'taskAvailablePeople',

	assignPerson( person ) {
		this.props.assignPersonToTask( person.id, this.props.task );
	},

	renderTeam() {
		return this.props.persons.map( ( person ) => {
			return (
				<Person person={ person } clickCallback={ this.assignPerson } />
			);
		} );
	},

	render() {
		return (
			<Card className="taskAvailablePeople">
				{ this.renderTeam() }
			</Card>
		);
	}
} );

export default connect(
	state => { return {} },
	dispatch => bindActionCreators( {
		assignPersonToTask
	}, dispatch )
)( TeamList );
