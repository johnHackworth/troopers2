import React from 'react';

export default React.createClass( {
	displayName: 'MouthView',

	getCropPosition() {
		const gender = this.props.dna[ 0 ] ? 0 : 1;
		return '-' + ( this.props.size / 98 * 100 * this.props.dna[6] + 1 ) + 'px -' + ( this.props.size / 98 * 100 *  this.props.dna[ 7 ]  + 1 + this.props.size / 98 * 100 *  400 * gender ) + 'px';
	},

	getStyles() {
		const imgUrl = '../../../../assets/people/mouths.png';
		return {
			backgroundImage: 'url(' + imgUrl + ')',
			width: this.props.size || 98,
			height: this.props.size || 98,
			backgroundPosition: this.getCropPosition(),
			backgroundSize: this.props.size / 98 * 1000,
			position: 'absolute',
			top: 0,
			left: 0
		};
	},

	render() {
		return (
			<div className="mouthView"
				style={ this.getStyles() } />
		);
	}
} );
