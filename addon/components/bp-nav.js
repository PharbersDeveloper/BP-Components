import Component from '@ember/component';
import layout from '../templates/components/bp-nav';
import { equal } from '@ember/object/computed';

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
	bpNavDropdown: 'bp-nav/dropdown'
});
