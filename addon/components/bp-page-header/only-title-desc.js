import Component from '@ember/component';
import layout from '../../templates/components/bp-page-header/only-title-desc';

export default Component.extend({
	layout,
	tagName: '',
	/**
	 * 为组件添加的 class
	 * @property class
	 * @type {string}
	 * @default ''
	 * @public
	 */
	class: '',
	/**
	 * 是否是link
	 * @property linkTo
	 * @type {string}
	 * @default ''
	 * @public
	 */
	linkTo: '',
	/**
	 * link to 中的text
	 * @property linkToText
	 * @type {string}
	 * @default ''
	 * @public
	 */
	linkToText: ''
});
