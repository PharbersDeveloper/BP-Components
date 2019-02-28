import Component from '@ember/component';
import layout from '../../templates/components/bp-nav/item';

export default Component.extend({
	layout,
	tagName: 'li',
	ariaRole: 'navigation"s item',
	/**
	 * 是否冒泡
	 * @property bubble
	 * @type {boolean}
	 * @default false
	 * @public
	 */
	bubble: false,

	/**
	 * Called when clicking the nav item
	 *
	 * @event onClick
	 * @public
	 */
	onClick() { },
	click() {

		this.get('onClick')(this.get('value'));
		return this.get('bubble');
	},
	value: null

});
