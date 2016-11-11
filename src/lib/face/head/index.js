import React from 'react';

export default React.createClass( {
	displayName: 'HeadView',

	getCropPosition() {
		return '-' + ( this.props.size / 98 * 100 * this.props.dna[ 3 ] + 1 ) + 'px -' + ( this.props.size / 98 * 100 *  this.props.dna[ 2 ]  + 1 ) + 'px';
	},

	getStyles() {
		const imgUrl = '../../../../assets/people/heads.png';
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
			<div className="headView"
				style={ this.getStyles() } />
		);
	}
} );
