import Component from '@ember/component';
import layout from '../../templates/components/bp-pagination/item';

export default Component.extend({
	layout,
	tagName: 'li',
	classNames: ['bp-pagination-item'],
	classNameBindings: ['disabled'],
	disabled: false,
	onClick() { },
	bubble: false,
	actions: {
		tapBtn() {
			this.get('onClick')();
			return this.get('bubble');
		}
	}
});
