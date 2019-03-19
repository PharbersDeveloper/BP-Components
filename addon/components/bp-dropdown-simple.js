import Component from '@ember/component';
import layout from '../templates/components/bp-dropdown-simple';
import { computed } from '@ember/object';

export default Component.extend({
	layout,
	/**
	 * 选择的值
	 * @property choosedValue
	 * @type {object|string}
	 * @default null
	 * @public
	 */
	choosedValue: null,
	/**
	 * 可选择的选项
	 * @property options
	 * @type {Array}
	 * @default null
	 * @public
	 */
	options: null,
	/**
	 * 要展示的 item 的 key
	 * @property {string}
	 * @default 'value'
	 * @public
	 */
	optionKey: 'value',
	/**
	 * 判断 option 是否为 object 类型
	 * @property optionIsObject
	 * @type {boolean}
	 * @default true
	 * @private
	 */
	optionIsObject: computed('choosedValue', function () {
		let choosedValue = this.get('choosedValue');

		return typeof choosedValue === 'object';
	}),
	actions: {
		changeValue(item) {
			let optionKey = this.get('optionKey');

			this.set('choosedValue', item[optionKey]);
		}
	}
});
