import Component from '@ember/component';
import layout from '../templates/components/bp-checkbox';

export default Component.extend({
	layout,
	/**
	 * 当前的值
	 * @property curValues
	 * @type {Array}
	 * @default null
	 * @public
	 */
	curValues: null,
	/**
	 * 是否垂直分布
	 * @property vertical
	 * @type {boolean}
	 * @default true
	 * @public
	 */
	vertical: true,

	/**
	 * 选中的值
	 * @property value
	 * @type {string|object}
	 * @default null
	 * @private
	 */
	value: null,

	/**
	 * 要展示的选项
	 * @property checkboxs
	 * @type {Array}
	 * @default null
	 * @public
	 */
	checkboxs: null
});
