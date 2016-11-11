import React from 'react';

export default React.createClass( {
	displayName: 'EyesView',

	getCropPosition() {
		if ( this.props.isBlinking ) {
			return '-' + ( this.props.size / 98 * 100 * this.props.dna[ 4 ] + 1 ) + 'px -' + this.props.size / 98 *  400 + 'px';
		}
		return '-' + ( this.props.size / 98 * 100 * this.props.dna[ 4 ] + 1 ) + 'px -' + ( this.props.size / 98 * 100 * this.props.dna[ 5 ] + 1 ) + 'px';
	},

	getStyles() {
		const imgUrl = '../../../../assets/people/eyes.png';
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
			<div className="eyesView"
				style={ this.getStyles() } />
		);
	}
} );
