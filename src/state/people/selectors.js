export const getPersonById = ( state, id ) => {
	const person = state.people.items[ id ];
	if ( person ) {
		return person;
	}
	return null;
};

export const getEmployees = ( state ) => {
	const companyList = state.people.company;
	return state.people.items.filter( ( person ) => {
		if ( companyList.indexOf( person.id ) >= 0 ) {
			return person;
		}
		return false;
	} );
};

export const getEmployeeIds = ( state ) => {
	return state.people.company;
};

export const getEmployeeAllowedAreas = ( state, personId ) => {
	return state.people.allowedAreas[ personId ] || {};
};

export const getPeople = ( state ) => {
	return state.people.items;
};

export const isEmployee = ( state, personId ) => {
	return state.people.company.indexOf( personId ) >= 0;
};