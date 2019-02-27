import Component from '@ember/component';
import layout from '../../templates/components/bp-nav/dropdown';
import { computed } from '@ember/object';

export default Component.extend({
	layout,
	tagName: 'li',
	classNames: ['bp-nav-dropdown'],
	classNameBindings: ['showChildList:show-child-list:hidden-child-list'],
	/**
	 * @property showChildList
	 * @type {boolean}
	 * @private
	 */
	showChildList: false,
	/**
	 * 当 childlist 的路由是 active 状态且showChildList 为 false 的时候
	 * 此 dropdown 下的 .dd-title 有 .title-active 状态
	 * @property titleActive
	 * @type {boolean}
	 * @default false
	 * @private
	 */
	titleActive: computed('showChildList', function () {
		return !this.get('showChildList');
	}),
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
		},
		chooseDdList() {
			this.set('titleActive', true);
			console.log('ddddddd');
		}
	}
});
