import './styles.css';
import React from 'react';
import ProgressBar from '../../components/progress-bar';
import Gridicon from '../../components/gridicon';

export default React.createClass( {
	displayName: 'PersonAttribute',

	render() {
		let type = '';
		if ( this.props.person[ this.props.name ] > 70 ) {
			type = 'high';
		}
		if ( this.props.person[ this.props.name ] > 85 ) {
			type = 'veryhigh';
		}
		if ( this.props.person[ this.props.name ] < 30 ) {
			type = 'low';
		}
		if ( this.props.person[ this.props.name ] < 15 ) {
			type = 'verylow';
		}

		return (
			<div className={"personAttribute " + type }>
				<div className="personAttribute__name"> { this.props.name } </div>
				<ProgressBar value={ this.props.person[ this.props.name ] } is-compact />
				<div className="personAttribute__value"> { this.props.person[ this.props.name ] } </div>
			</div>
		)
	},
} );