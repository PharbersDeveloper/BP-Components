import Component from '@ember/component';
import layout from '../templates/components/bp-radio';

export default Component.extend({
	layout,
	/**
	 * 当前的值
	 * @property curValue
	 * @type {string|object}
	 * @default null
	 * @private
	 */
	curValue: null,
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
	 * @property radios
	 * @type {Array}
	 * @default null
	 * @public
	 */
	radios: null
});
