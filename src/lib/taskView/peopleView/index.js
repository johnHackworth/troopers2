import './styles.css';
import React from 'react';
import Card from '../../../components/card';
import Gridicon from '../../../components/gridicon';
import Face from '../../face';

export default React.createClass( {
	displayName: 'peopleView',

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

	onClick() {
		this.props.clickCallback( this.props.person );
	},

	render() {
		return (
			<Card is-compact className="peopleView" onClick={ this.onClick }>
				<div className="peopleView__content">
					<Face dna={ this.props.person.dna } size={ 40 }/>
					<div className="listItem__personInfo">
						<div className="listItem__title">
							<div className="personName"> { this.props.person.name } </div>
							<div className="personArea"> { this.getAreaIcon() } </div>
						</div>
					</div>
				</div>
			</Card>
		);
	},
} );
