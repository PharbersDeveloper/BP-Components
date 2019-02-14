import Component from '@ember/component';
import layout from '../templates/components/bp-button-group';
import { equal } from '@ember/object/computed';
import { isArray, A } from '@ember/array';

export default Component.extend({
	layout,
	ariaRole: 'group',
	classNameBindings: ['vertical:btn-group-vertical:btn-group'],

	/**
   * @property buttonComponent
   * @type {String}
   * @private
   */
	buttonComponent: 'bp-button-group/button',
	/**
	 * Set to true for a vertically stacked button group
	 *
	 * @property vertical
	 * @type boolean
	 * @default false
	 * @public
	 */
	vertical: false,

	/**
	 *  radio or checkbox
	 *
	 * @property type
	 * @type string
	 * @default null
	 * @public
	 */
	type: null,

	/**
	 * 当前选中的item的值
	 * @property value
	 * @type array
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
	 *
	 * 当 value 改变的时候触发
	 * @event onChange
	 * @param {*} value
	 * @public
	 */
	onChange() { },
	/**
		 * 设置选中的值
		 * @event btnRadioItem
		 * @param value
		 * @private
		 */
	btnRadioItem(value) {
		return value;
	},
	/**
	 * 设置选中的值
	 * @event btnCheckboxItems
	 * @param value
	 * @private
	 */
	btnCheckboxItems(pressedValue, domain) {
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
		pressDownBtn(pressedValue) {
			let newValue = null;

			if (this.get('isRadio')) {
				newValue = this.get('btnRadioItem')(pressedValue);
			} else {
				newValue = this.get('btnCheckboxItems')(pressedValue, this);
			}
			this.set('value', newValue);
			this.get('onChange')(newValue);
		}
	}
});
