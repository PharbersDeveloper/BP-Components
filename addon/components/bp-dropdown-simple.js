import Component from '@ember/component';
import layout from '../templates/components/bp-dropdown-simple';
import { computed } from '@ember/object';

export default Component.extend({
	layout,
	/**
	 * 选中item后要输出的id
	 * @property valueId
	 * @type {string}
	 * @default ''
	 * @public
	 */
	valueId: '',
	/**
	 * become dropdown state to disabled
	 * @property disabled
	 * @default false
	 * @type {boolean}
	 * @public
	 */
	disabled: false,
	/**
	 * 传入id之后要同步修改 choosedValue 的值
	 * @property valueById
	 * @type {string}
	 * @default ''
	 * @private
	 */
	valueById: computed('valueId', 'item', function () {
		let { valueId, item, optionKey, options } =
			this.getProperties('valueId', 'item', 'optionKey', 'options'),
			value = '';

		if (!item) {
			options.forEach((ele) => {
				if (ele.id === valueId) {
					value = ele[optionKey];
				}
			});
		}
		return value ? value : item[optionKey];
	}),
	/**
	 * 选择的值
	 * @property choosedValue
	 * @type {object|string}
	 * @default null
	 * @public
	 */
	choosedValue: null,
	/**
	 * 选中的选项
	 * @property item
	 * @type {object|string}
	 * @default null
	 * @private
	 */
	item: null,
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
	/**
	 * 要传递的 action
	 * @method onChange
	 * @param item
	 * @public
	 */
	onChange() { },
	actions: {
		changeValue(item) {
			let optionKey = this.get('optionKey');

			this.set('item', item);
			this.set('valueId', item.id);
			this.set('choosedValue', item[optionKey]);
			this.get('onChange')(item);
		}
	}
});
