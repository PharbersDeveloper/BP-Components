import Component from '@ember/component';
import layout from '../templates/components/bp-dropdown';
import { computed } from '@ember/object';
import { A as initArray } from '@ember/array';
import { once } from '@ember/runloop';

const isSelectedOption = (option) => option.$().is(':selected');


export default Component.extend({
	layout,
	tagName: 'select',
	classNames: ['bp-dropdown'],
	dropDownOption: 'bp-dropdown/option',
	/**
	 * 当前所有的选项.
	 *
	 * @private
	 * @property options
	 */
	options: computed(function () {
		return initArray([]);
	}),
	/**
	 *  `onClick` 函数
	 *
	 * @property onClick
	 * @type Function
	 */
	onClick() { },

	/**
	 *  `onChange` 函数
	 *
	 * @property onChange
	 * @type Function
	 */
	onChange() { },
	/**
	 * 当发生 change/click 事件时，需要调用 onClick/onChange.
	 *
	 * @method _handleAction
	 * @type Function
	 * @param {String} action
	 * @param {String|Object} value
	 * @param {Object} event
	 */
	_handleAction(action, value, event) {
		this.get(action)(value, event);
	},

	/**
	 * change 事件
	 */
	change(event) {
		this._handleAction('onChange', this._getValue(), event);
	},

	/**
	 * click 事件
	 */
	click(event) {
		this._handleAction('onClick', this._getValue(), event);
	},
	/**
	 * 读取当前选中的 option 的值.
	 *
	 * @private
	 * @return {Array|Object} 当前选中的值
	 */
	_getValue() {
		let selectedValue = this.get('options').find(isSelectedOption);

		return selectedValue ? selectedValue.get('value') : null;
	},
	/**
	 * 设置默认值
	 *
	 * @private
	 */
	_setDefaultValues() {
		once(this, this.__setDefaultValues);
	},

	__setDefaultValues() {
		let canSet = !this.isDestroying && !this.isDestroyed;

		if (canSet && this.get('value') === null) {
			// 调用 `onChange` 来设置默认值
			this._handleAction('onChange', this._getValue(), event);
		}
	},

	actions: {

		/**
		* 当 p-option 插入 select 组件中后，添加 option 进入 options
		*
		* @param {<p-option>} option - p-option component.
		* @private
		*/
		registerOption(option) {
			this.get('options').push(option);
			this._setDefaultValues();
		},

		/**
		 * 当 p-option 卸载，移除 option
		 *
		 * @param {<p-option>} option - p-option component.
		 * @private
		 */
		unregisterOption(option) {
			this.get('options').removeObject(option);
			this._setDefaultValues();
		}
	}
});
