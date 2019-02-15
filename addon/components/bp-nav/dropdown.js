import Component from '@ember/component';
import layout from '../../templates/components/bp-nav/dropdown';

export default Component.extend({
	layout,
	tagName: 'li',
	classNames: ['bp-nav-dropdown'],
	classNameBindings: ['showChildList'],
	/**
	 * @property showChildList
	 * @type {boolean}
	 * @private
	 */
	showChildList: false,
	/**
	 * @property ddItem
	 * @type {String}
	 * @private
	 */
	ddItem: 'bp-nav/item',
	/**
	 * @property ddLinkTo
	 * @type {String}
	 * @private
	 */
	ddLinkTo: 'bp-nav/link-to',
	actions: {
		/**
		 * @method changeShowProperty
		 * @private
		 */
		changeShowProperty() {
			this.toggleProperty('showChildList');
		}
	}
});
