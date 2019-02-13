import Component from '@ember/component';
import layout from '../templates/components/choose-group';
import { equal } from '@ember/object/computed';
import { isArray, A } from '@ember/array';

export default Component.extend({
	layout,
	/**
	 * @property chooseItemComponent
	 * @type {String}
	 * @private
	 */
	chooseItemComponent: 'choose-group/item',

	/**
	 * 判断组件是单选还是多选
	 * @property type
	 * @type string
	 * @default null
	 * @public
	 */
	type: null,

	/**
	 * 当前选中的item的值
	 * @property value
	 * @type array/object
	 * @public
	 */
	value: null,

	/**
	 * @property isRadio
	 * @type boolean
	 * @private
	 */
	isRadio: equal('type', 'radio').readOnly(),

	/**
	 * 当 value 改变的时候触发
	 *
	 * @event onChange
	 * @param {*} value
	 * @public
	 */
	onChange() { },
	/**
	 * 设置选中的值
	 * @event choosedRadioItem
	 * @param value
	 * @private
	 */
	choosedRadioItem(value) {
		return value;
	},
	/**
	 * 设置选中的值
	 * @event choosedCheckboxItems
	 * @param value
	 * @private
	 */
	choosedCheckboxItems(pressedValue, domain) {
		let newValue = null;

		if (!isArray(domain.get('value'))) {
			newValue = A([pressedValue]);
		} else {
			newValue = A(domain.get('value').slice());
			if (newValue.includes(pressedValue)) {
				newValue.removeObject(pressedValue);
			} else {
				newValue.pushObject(pressedValue);
			}
		}
		return newValue;
	},
	actions: {
		chooseItem(pressedValue) {
			let newValue = null;

			if (this.get('isRadio')) {
				newValue = this.get('choosedRadioItem')(pressedValue);
			} else {
				newValue = this.get('choosedCheckboxItems')(pressedValue, this);
			}
			this.set('value', newValue);
			this.get('onChange')(newValue);
		}
	}
});
