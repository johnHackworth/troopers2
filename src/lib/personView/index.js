import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPersonById, getEmployeeAllowedAreas, isEmployee } from '../../state/people/selectors';
import { getPersonTasks } from '../../state/work/selectors';
import Card from '../../components/card';
import FoldableCard from '../../components/foldable-card';
import ProgressBar from '../../components/progress-bar';
import Gridicon from '../../components/gridicon';
import Button from '../../components/button';
import FormToggle from '../../components/forms/form-toggle';
import Face from '../face';
import PersonAttribute from '../personAttribute';
import { togglePersonArea } from '../../state/people/actions';

import { hirePerson } from '../../logic/people';

const PersonView = React.createClass( {
	displayName: 'PersonView',

	renderCurrentProjects() {
		return this.props.tasks.map( ( task ) => {
			return <div className="personView__project">{ task.title }</div>;
		} );
	},

	toggleArea( area ) {
		this.props.togglePersonArea( this.props.person.id, area, ! this.props.allowedAreas[ area ] );
	},

	recruit() {
		this.props.hirePerson( this.props.personId );
	},

	renderRecruitment() {
		return (
			<Card className="personView__recruitment">
				<div className="personView__recruit-button">
					<Button onClick={ this.recruit } >Recruit</Button>
				</div>
			</Card>
		);
	},

	renderProjects() {
		return (
			<Card className="personView__projects">
				<h4>Current Projects</h4>
				{ this.renderCurrentProjects() }
				{ this.renderAreaButtons() }
			</Card>
		);
	},

	renderAreaButton( area ) {
		return (
			<div className="personView__area-button">
				<span className="personView__area-name">{ area }</span>
				<FormToggle checked={ this.props.allowedAreas[ area ] } onChange={ this.toggleArea.bind( this, area ) } />
			</div>
		);
	},

	renderAreaButtons() {
		return (
			<div>
				<h3> Assigned work areas </h3>
				<div className="personView__areas">
					{ this.renderAreaButton( 'design' ) }
					{ this.renderAreaButton( 'product' ) }
					{ this.renderAreaButton( 'frontend' ) }
					{ this.renderAreaButton( 'backend' ) }
					{ this.renderAreaButton( 'operations' ) }
					{ this.renderAreaButton( 'architecture' ) }
				</div>

				<div className="personView__areas">
					{ this.renderAreaButton( 'business planning' ) }
					{ this.renderAreaButton( 'marketing' ) }
					{ this.renderAreaButton( 'copy writting' ) }
					{ this.renderAreaButton( 'scouting' ) }
					{ this.renderAreaButton( 'negotiation' ) }
					{ this.renderAreaButton( 'q.a.' ) }
				</div>
			</div>
		);
	},

	render() {
		return (
			<div className="personView">
				<Card className="personView__header">
					<Face dna={ this.props.person.dna } size={ 160 }/>
					<div className="personView__personInfo">
						<div className="personView__personName"> { this.props.person.name } </div>
						<div className="personView__personArea"> { this.props.person.area } </div>
					</div>
				</Card>
				<Card header="Attributes" className="personView__attributes">
					<div className="personView__product">
						<PersonAttribute person={ this.props.person } name="design" />
						<PersonAttribute person={ this.props.person } name="product" />
						<PersonAttribute person={ this.props.person } name="backend" />
						<PersonAttribute person={ this.props.person } name="frontend" />
						<PersonAttribute person={ this.props.person } name="architecture" />
						<PersonAttribute person={ this.props.person } name="operations" />
					</div>
					<div className="personView__business">
						<PersonAttribute person={ this.props.person } name="business" />
						<PersonAttribute person={ this.props.person } name="marketing" />
						<PersonAttribute person={ this.props.person } name="copyWritting" />
						<PersonAttribute person={ this.props.person } name="scouting" />
						<PersonAttribute person={ this.props.person } name="negotiation" />
						<PersonAttribute person={ this.props.person } name="qa" />
					</div>
					<div className="personView__personal">
						<PersonAttribute person={ this.props.person } name="sociability" />
						<PersonAttribute person={ this.props.person } name="learning" />
						<PersonAttribute person={ this.props.person } name="workEthics" />
						<PersonAttribute person={ this.props.person } name="conflictive" />
						<PersonAttribute person={ this.props.person } name="negotiation" />
					</div>
				</Card>
				{ this.props.isEmployee ? this.renderProjects() : this.renderRecruitment() }

			</div>
		);
	}
} );

export default connect(
	state => {
		return {
			personId: state.game.selectedItem,
			isEmployee: isEmployee( state, state.game.selectedItem ),
			person: getPersonById( state, state.game.selectedItem ),
			tasks: getPersonTasks( state, state.game.selectedItem ),
			allowedAreas: getEmployeeAllowedAreas( state, state.game.selectedItem )
		};
	},
	dispatch => bindActionCreators( {
		togglePersonArea,
		hirePerson
	}, dispatch )
)( PersonView );
