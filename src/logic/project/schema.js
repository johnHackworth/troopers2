export const taskTree = {
	incorporate: [],
	basicArchitecture: [],
	userDatabase: [],
	corporateImage: [ 'incorporate' ],
	loginService: [ 'basicArchitecture', 'userDatabase' ],
	userDashboard: [ 'loginService' ],
	userProfile: [ 'loginService' ],
	uploadImage: [ 'userDashboard' ],
	userImages: [ 'uploadImage' ],
	addFriends: [ 'userProfile' ],
	ads: [ 'userProfile' ],
	comments: [ 'userProfile' ]
};

export const taskDetails = {
	incorporate: {
		title: 'Create a new company',
		description: 'Fun stuff, uh?',
		architecture: 0,
		design: 0,
		product: 0,
		frontend: 0,
		backend: 0
	},
	basicArchitecture: {
		title: 'Base Platform Architecture',
		description: 'Everything starts somewhere. And before doing anything cool, there\'s a  lot of planning to do and diagrams to draw.',
		architecture: 100,
		design: 0,
		product: 20,
		frontend: 20,
		backend: 20
	},
	userDatabase: {
		title: 'User Data Structure',
		description: 'Lorem impsum donor blablabla',
		architecture: 20,
		design: 0,
		product: 10,
		frontend: 10,
		backend: 10
	},
	corporateImage: {
		title: 'Corporate Image',
		description: 'Lorem impsum blabla',
		architecture: 0,
		design: 70,
		product: 50,
		frontend: 10,
		backend: 0
	},
	loginService: {
		title: 'User login',
		description: 'Lorem ipsum blablah',
		architecture: 30,
		design: 40,
		product: 20,
		frontend: 30,
		backend: 40
	},
	userDashboard: {},
	userProfile: {},
	uploadImage: {},
	userImages: {},
	addFriends: {},
	ads: {},
	comments: {}
};
