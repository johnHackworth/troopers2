import React from 'react';
import { diceThrow } from '../helpers';
import Head from './head';
import Eyes from './eyes';
import Mouth from './mouth';
import Hair from './hair';

export default React.createClass( {
	displayName: 'Face',

	componentWillMount() {
		this.blinkTimeout = setTimeout( () => this.blink(), diceThrow( 10000 ) );
	},

	componentWillUnmount() {
		clearTimeout( this.blinkTimeout );
	},

	getInitialState() {
		return {
			isBlinking: false
		};
	},

	getDefaultProps() {
		return {
			size: 98
		};
	},

	blink() {
		this.setState( { isBlinking: true } );
		this.blinkTimeout = setTimeout( () => this.unblink(), 200 + diceThrow( 300 ) );
	},

	unblink() {
		this.setState( { isBlinking: false } );
		this.blinkTimeout = setTimeout( () => this.blink(), 1000 + diceThrow( 9000 ) );
	},

	getStyles() {
			//
		return {
			background: '#777',
			width: this.props.size,
			height: this.props.size,
			display: 'inline-block',
			position: 'relative',
			// transform: 'scale( ' + this.props.size / 98 + ',' + this.props.size / 98 + ' )',
		};
	},

	render() {
		return (
			<div className="face" style={ this.getStyles() }>
				<Head dna={ this.props.dna } size={ this.props.size } />
				<Eyes dna={ this.props.dna } isBlinking={ this.state.isBlinking } size={ this.props.size } />
				<Mouth dna={ this.props.dna } isTalking={ this.state.isTalking } size={ this.props.size } />
				<Hair dna={ this.props.dna } size={ this.props.size } />
			</div>
		);
	}
} );
