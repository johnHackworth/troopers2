import { SCENE_CHANGE } from '../action-types';

export function changeScene( scene, item ) {
	return ( dispatch ) => {
		dispatch( {
			type: SCENE_CHANGE,
			scene: scene,
			item: item
		} );
	};
}
