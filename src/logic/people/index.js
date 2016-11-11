import { HIRE_PERSON, CHANGE_HAPPINESS } from '../../state/action-types';
import { percentualAttributes } from './schema';
import { getRandomName } from './nameGenerator';
import { diceThrow } from '../../lib/helpers';
import { getPersonById, getEmployeeAllowedAreas } from '../../state/people/selectors';

const getRandomAttributes = function() {
	const attributes = {};
	percentualAttributes.forEach( ( attribute ) => {
		attributes[ attribute ] = diceThrow( 40 );
	} );
	return attributes;
};

const getDNA = function() {
	return [
		diceThrow( 2 ), // 0 gender
		diceThrow( 6 ), // 1 culture
		diceThrow( 4 ), // 2 skin
		diceThrow( 4 ), // 3 head
		diceThrow( 4 ), // 4 eyes
		diceThrow( 4 ), // 5 eye color
		diceThrow( 4 ), // 6 mouth
		diceThrow( 4 ), // 7 mouth 2
		diceThrow( 4 ), // hair 1
		diceThrow( 2 ), // hair 2
		diceThrow( 10 ), // hair color
	].join( '' );
};

const getEducation = function( currentFocus, attrs ) {
	if ( diceThrow( 10 ) > 5 ) {
		attrs.degree = 'none';
	} else {
		attrs.degree = currentFocus;
		attrs.learning += diceThrow( 60 );
		attrs.workEthics += diceThrow( 20 );
		attrs.greedy += diceThrow( 20 );
		if ( currentFocus === 'design' ) {
			attrs.design += diceThrow( 20 );
			attrs.product += diceThrow( 20 );
			attrs.frontEnd += diceThrow( 10 );
		}
		if ( currentFocus === 'development' ||
			currentFocus === 'systems' ) {
			attrs.backend += diceThrow( 10 );
			attrs.frontEnd += diceThrow( 10 );
			attrs.architecture += diceThrow( 20 );
			attrs.operations += diceThrow( 10 );
		}
		if ( currentFocus === 'press' ) {
			attrs.copyWritting += diceThrow( 30 );
			attrs.marketing += diceThrow( 20 );
		}
		if ( currentFocus === 'business' ) {
			attrs.business += diceThrow( 30 );
			attrs.marketing += diceThrow( 20 );
		}
		if ( currentFocus === 'hr' ) {
			attrs.scouting += diceThrow( 30 );
			attrs.sociability += diceThrow( 20 );
		}
	}
	return attrs;
};

const getExperience = function( currentFocus, attrs ) {
	for ( let i = attrs.age; i > 20; i-- ) {
		if ( currentFocus === 'design' ) {
			attrs.design += diceThrow( 4 );
			attrs.product += diceThrow( 4 );
			attrs.frontEnd += diceThrow( 2 );
		}
		if ( currentFocus === 'development' ) {
			attrs.backend += diceThrow( 4 );
			attrs.frontEnd += diceThrow( 4 );
			attrs.architecture += diceThrow( 2 );
			attrs.operations += diceThrow( 2 );
		}
		if ( currentFocus === 'systems' ) {
			attrs.backend += diceThrow( 2 );
			attrs.architecture += diceThrow( 4 );
			attrs.operations += diceThrow( 4 );
		}
		if ( currentFocus === 'press' ) {
			attrs.copyWritting += diceThrow( 2 );
			attrs.marketing += diceThrow( 3 );
		}
		if ( currentFocus === 'business' ) {
			attrs.business += diceThrow( 3 );
			attrs.marketing += diceThrow( 3 );
			attrs.negotiation += diceThrow( 3 );
		}
		if ( currentFocus === 'hr' ) {
			attrs.scouting += diceThrow( 3 );
			attrs.negotiation += diceThrow( 3 );
		}
		if ( currentFocus === 'support' ) {
			attrs.sociability += diceThrow( 2 );
			attrs.qa += diceThrow( 3 );
		}
	}
	return attrs;
};

const getComputedAttributes = function() {
	let attrs = getRandomAttributes();
	const orientations = {
		design: ( 2 * attrs.product + 2 * attrs.design + attrs.frontend ) / 5,
		development: ( 2 * attrs.backend + 2 * attrs.frontend + attrs.architecture ) / 5,
		systems: ( 2 * attrs.operations + 2 * attrs.architecture + attrs.qa ) / 5,
		support: ( 2 * attrs.qa + 2 * attrs.sociability + attrs.copyWritting ) / 5,
		press: ( 2 * attrs.copyWritting + 2 * attrs.marketing + attrs.design ) / 5,
		business: ( 2 * attrs.business + 2 * attrs.negotiation + attrs.marketing ) / 5,
		hr: ( 2 * attrs.scouting + 2 * attrs.sociability + attrs.negotiation ) / 5
	};

	attrs.sociability += diceThrow( 40 );
	attrs.learning += diceThrow( 20 );
	attrs.workEthics += diceThrow( 40 );
	attrs.conflictive += diceThrow( 60 );
	attrs.greedy += diceThrow( 40 );
	attrs.hypeable += diceThrow( 40 );
	attrs.negotiation += diceThrow( 20 );

	let biggestFocus = 0;
	let currentFocus = '';
	for ( const prop in orientations ) {
		if ( orientations[ prop ] > biggestFocus ) {
			currentFocus = prop;
			biggestFocus = orientations[ prop ];
		}
	}

	attrs.age = 20 + diceThrow( 25 );
	attrs.area = currentFocus;

	attrs = getEducation( currentFocus, attrs );
	attrs = getExperience( currentFocus, attrs );
	return attrs;
};

const generatePerson = function( id ) {
	const dna = getDNA();
	const name = getRandomName( null, 1 * dna[ 0 ] );
	return Object.assign(
		{},
		{ name, id },
		{ dna: dna },
		getComputedAttributes()
	);
};

export const generatePeople = function( amount ) {
	const people = [];
	for ( let i = amount; i--; i ) {
		const nextId = people.length;
		people.push( generatePerson( nextId ) );
	}
	return people;
};

export function hirePerson( id ) {
	return ( dispatch ) => {
		addHappiness( id, diceThrow( 50 ) )( dispatch );

		dispatch( {
			type: HIRE_PERSON,
			id
		} );
	};
}

export function addHappiness( id, happiness ) {
	return ( dispatch ) => {
		dispatch( {
			type: CHANGE_HAPPINESS,
			id,
			happiness
		} );
	};
}

export function getPersonWorkInArea( state, id, area ) {
	const employeeAreas = getEmployeeAllowedAreas( state, id );
	console.log( employeeAreas,employeeAreas[ area ], area )
	if ( employeeAreas[ area ] ) {
		const person = getPersonById( state, id );
		if ( diceThrow( 100 ) < person[ area ] ) {
			const quality = diceThrow( 100 );
			return quality > person[ area ] ? person[ area ] : quality;
		}
	}
	return 0;
}

export function peopleNextTurn() {
	return ( dispatch ) => {
	};
};
