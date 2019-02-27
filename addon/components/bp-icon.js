import Component from '@ember/component';
import layout from '../templates/components/bp-icon';
import { computed } from '@ember/object';

export default Component.extend({
	layout,
	tagName: '',
	/**
	 * icon name
	 * @property icon
	 * @type string
	 * @default ''
	 * @public
	 */
	icon: '',
	/**
	 * Symbol
	 * @property showicon
	 * @type string
	 * @default ''
	 * @private
	 */
	showicon: computed('icon', function () {
		return `${this.get('icon')}`;
	}),
	/**
	 * show icon color
	 * @property style
	 * @type string
	 * @default 'color:#42526E'
	 * @private
	 */
	style: computed('color', function () {
		let color = this.get('color');

		if (color) {
			return `color:${color}`;
		}
		return ``;
	}),
	/**
	 * custom icon size
	 * @property size
	 * @type string
	 * @default 'medium'
	 * @public
	 */
	size: 'medium',
	/**
	 * return icon class
	 * @property class
	 * @type string
	 * @default 'icon medium'
	 * @private
	 */
	class: computed('size', function () {
		let size = this.get('size');

		size = !size ? 'medium' : size;
		return `icon ${size}`;
	})
});
