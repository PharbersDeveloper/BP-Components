import Component from '@ember/component';
import layout from '../templates/components/bp-search-bar';
import { equal } from '@ember/object/computed';

export default Component.extend({
	layout,
	tagName: 'section',
	classNames: ['search-container'],
	classNameBindings: ['block::search-bar-inline', 'largeSize', 'smallSize'],
	/**
	 * bubble
	 * @property bubble
	 * @type boolean
	 * @default false
	 * @public
	 */
	bubble: false,
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
	 * Property for search value
	 * @property searchValue
	 * @type string
	 * @default ''
	 * @private
	 */
	searchValue: '',
	/**
	 * Property for input placeholder
	 * @property placeholder
	 * @type string
	 * @default ''
	 * @private
	 */
	placeholder: '',
	/**
	 * When clicking the button this action is called with the value of the input
	 * (that is the value of the "searchValue" property).
	 *
	 * @event onClick
	 * @param {*} searchValue
	 * @public
	 */
	onClick() { },
	actions: {
		change(event) {
			this.set('searchValue', event.target.value);
		},
		search() {
			let searchValue = this.get('searchValue');

			this.get('onClick')(searchValue);
			return this.get('bubble');
		}
	}

});
