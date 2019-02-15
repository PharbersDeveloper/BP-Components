import Component from '@ember/component';
import layout from '../templates/components/bp-nav';

export default Component.extend({
	layout,
	tagName: 'ul',
	classNames: ['bp-nav'],
	classNameBindings: ['stacked:flex-column'],
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
