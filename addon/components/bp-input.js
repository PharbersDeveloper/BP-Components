import Component from '@ember/component';
import layout from '../templates/components/bp-input';
import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
	layout,
	tagName: 'section',
	classNames: ['bp-input'],
	classNameBindings: ['block::input-inline', 'smallSize', 'largeSize', 'hasIcon'],
	/**
	 * Property to block
	 * @property block
	 * @type boolean
	 * @default false
	 * @public
	 */
	block: false,
	/**
	 * Property to size
	 * @property size
	 * @type string
	 * @default 'default'
	 * @public
	 */
	size: 'default',
	smallSize: equal('size', 'small'),
	largeSize: equal('size', 'large'),
	/**
	 * Property to icon
	 * @property icon
	 * @type string
	 * @default ''
	 * @public
	 */
	icon: '',
	/**
	 * Property to title
	 * @property title
	 * @type string
	 * @default ''
	 * @public
	 */
	title: '',
	hasIcon: computed('icon', function () {
		if (this.get('icon') !== '') {
			return true;
		}
		return false;
	}),
	onChange() { },
	actions: {
		change(event) {
			this.get('onChange')(event.target.value);
		}

		// input(event) {
		// 	this.get('onChange')(event.target.value);
		// }
	}

});
