import Component from '@ember/component';
import layout from '../../templates/components/bp-nav/dropdown';

export default Component.extend({
	layout,
	tagName: 'li',
	classNames: ['bp-nav-dropdown'],
	classNameBindings: ['active',
		'showChildList:show-child-list:hidden-child-list',
		'titleActive'],
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
	titleActive: false,
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
	/**
	 * @method checkSubLiHasActive
	 * @private
	 */
	checkSubLiHasActive() {
		let subLiHasActive = this.$('.bp-nav-dd-ul li').hasClass('active'),
			showChildList = this.get('showChildList'),
			isTitleActive = Boolean(subLiHasActive & !showChildList);

		this.set('titleActive', isTitleActive);
	},
	didInsertElement() {
		this._super(...arguments);
		this.checkSubLiHasActive();
	},
	actions: {
		/**
		 * @method changeShowProperty
		 * @private
		 */
		changeShowProperty() {
			this.toggleProperty('showChildList');
			this.checkSubLiHasActive();
		},
		/**
		 * @method receiveIsActive
		 * @private
		 */
		receiveIsActive() {
			this.checkSubLiHasActive();
		}
	}
});
