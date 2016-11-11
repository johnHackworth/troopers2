import React from 'react';

export default React.createClass( {
	displayName: 'Hairview',

	hairColors: [
		'../../../../assets/people/hair.png',
		'../../../../assets/people/hair1.png',
		'../../../../assets/people/hair2.png',
		'../../../../assets/people/hair3.png',
		'../../../../assets/people/hair4.png',
	],

	getCropPosition() {
		const gender = this.props.dna[ 0 ];
		return '-' + ( this.props.size / 98 * 100 * this.props.dna[8] + 1 ) + 'px -' + ( this.props.size / 98 * 100 *  this.props.dna[ 9 ]  + 1 +  this.props.size / 98 * 500 * gender ) + 'px';
	},

	getHair() {
		const color = this.props.dna[ 10 ];
		if ( color < 1 ) {
			return this.hairColors[ 0 ];
		}
		if ( color < 2 ) {
			return this.hairColors[ 3 ];
		}
		if ( color < 4 ) {
			return this.hairColors[ 1 ];
		}
		if ( color < 8 ) {
			return this.hairColors[ 2 ];
		}

		return this.hairColors[ 4 ];
	},

	getStyles() {

		const imgUrl = this.getHair();
		return {
			backgroundImage: 'url(' + imgUrl + ')',
			width: this.props.size || 98,
			height: this.props.size || 98,
			backgroundPosition: this.getCropPosition(),
			backgroundSize: this.props.size / 98 * 1000,
			position: 'absolute',
			top: 0,
			left: 0,
		};
	},

	render() {
		return (
			<div className="hairview"
				style={ this.getStyles() } />
		);
	}
} );
