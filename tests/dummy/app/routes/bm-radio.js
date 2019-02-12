import Route from '@ember/routing/route';

export default Route.extend({
	model() {
		return [{ id: 1, value: 'man', label: 'man-label' },
			{ id: 2, value: 'women', label: 'women-babel' },
			{ id: 3, value: 'unknow', label: 'unknow-babel' }];
	}

});
