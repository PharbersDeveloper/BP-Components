import Component from '@ember/component';
import layout from '../templates/components/bp-nav';
import { equal } from '@ember/object/computed';
import $ from 'jquery';

export default Component.extend({
	layout,
	tagName: 'ul',
	classNames: ['bp-nav'],
	classNameBindings: ['stacked:flex-column', 'isDark:nav-dark:nav-light'],
	/**
	 * 控制内部元素排列方式
	 *
	 * @property stacked
	 * @type boolean
	 * @default true
	 * @public
	 */
	stacked: true,
	/**
	 * 控制主题
	 *
	 * @property theme
	 * @type string
	 * @default 'dark'
	 * @public
	 */
	theme: 'dark',
	/**
	 * 控制主题颜色
	 *
	 * @property isDark
	 * @type boolean
	 * @default true
	 * @public
	 */
	isDark: equal('theme', 'dark'),
	/**
	 * @property bpNavItem
	 * @type {String}
	 * @private
	 */
	bpNavItem: 'bp-nav/item',
	/**
	 * @property bpNavLinkTo
	 * @type {String}
	 * @private
	 */
	bpNavLinkTo: 'bp-nav/link-to',
	/**
	 * @property bpNavDropdown
	 * @type {String}
	 * @private
	 */
	bpNavDropdown: 'bp-nav/dropdown',
	checkSiblingHasActive() {
		let siblingsDOM = this.$('> li'),
			siblingsDOMHasActive = siblingsDOM.hasClass('active');

		return siblingsDOMHasActive;

	},
	didInsertElement() {
		this._super(...arguments);
		this.checkSiblingHasActive();
	},
	click() {
		let linkActive = this.checkSiblingHasActive(),
			dropdowns = this.$('.bp-nav-dropdown');

		// 判断dropdown 中的li是否再活跃状态，没有则remove title-avtive
		dropdowns.each(function () {
			if ($(this).find('li').hasClass('active')) {
				$(this).siblings().removeClass('title-active');
			}
		});

		if (linkActive) {
			this.$('.hidden-child-list').removeClass('title-active');
		}

		return false;
	}
});
