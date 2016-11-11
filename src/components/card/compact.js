/** @ssr-ready **/

/**
 * External dependencies
 */
var React = require( 'react' ),
	assign = require( 'lodash/assign' ),
	classnames = require( 'classnames' );

/**
 * Internal dependencies
 */
var Card = require( './index' );

module.exports = React.createClass( {
	displayName: 'CompactCard',

	render: function() {
		const props = assign( {}, this.props, { className: classnames( this.props.className, 'is-compact' ) } );

		return (
			<Card { ...props }>
				{ this.props.children }
			</Card>
		);
	}
} );
