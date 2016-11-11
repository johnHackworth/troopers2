import './styles.css';
import React from 'react';
import Card from '../../../components/card';
import ProgressBar from '../../../components/progress-bar';
import Gridicon from '../../../components/gridicon';
import Face from '../../face';
import { changeScene } from '../../../state/game/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const teamListItem = React.createClass( {
	displayName: 'TeamListItem',

	icons: {
		development: 'code',
		design: 'customize',
		business: 'stats-alt',
		hr: 'user',
		support: 'thumbs-up',
		press: 'speaker',
		systems: 'cog'
	},

	getAreaIcon() {
		return <Gridicon icon={ this.icons[ this.props.person.area ] } size={ 18 }/>;
	},

	goToPerson() {
		this.props.changeScene( 'person', this.props.person.id );
	},

	render() {
		return (
			<Card is-compact className="listItem" onClick={ this.goToPerson }>
				<div className="listItem__content">
					<Face dna={ this.props.person.dna } size={ 60 }/>
					<div className="listItem__personInfo">
						<div className="listItem__title">
							<div className="personName"> { this.props.person.name } </div>
							<div className="personArea"> { this.props.person.area } { this.getAreaIcon() } </div>
						</div>
						<div className="personHappiness">
							<Gridicon icon="status" />
							<ProgressBar value={ this.props.person.happiness} is-compact />
						</div>
					</div>
				</div>
			</Card>
		);
	},
} );

export default connect(
	state => {
		return {};
	},
	dispatch => bindActionCreators( {
		changeScene: changeScene
	}, dispatch )
)( teamListItem );
