import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
	model() {
		return A([
			{ id: 1, url: 'card', value: '卡片' },
			{ id: 2, url: 'layout', value: '布局' },
			{ id: 3, url: 'bp-input', value: 'input' },
			{ id: 4, url: 'dropdown', value: 'dropdown' },
		])
	}
});
