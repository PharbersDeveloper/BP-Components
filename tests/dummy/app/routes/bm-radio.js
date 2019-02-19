import Route from '@ember/routing/route';

export default Route.extend({
	model() {
		return [{ id: 1, value: '', label: 'man-label' },
		{ id: 2, value: '', label: 'women-babel' },
		{ id: 3, value: '', label: 'unknow-babel' }];
	}

});
