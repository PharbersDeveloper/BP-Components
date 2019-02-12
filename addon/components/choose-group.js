import Component from '@ember/component';
import layout from '../templates/components/choose-group';
import { equal } from '@ember/object/computed';

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
	 * 当 value 改变的时候触发
	 *
	 * @event onChange
	 * @param {*} value
	 * @public
	 */
	onChange() { },

	actions: {
		chooseItem(pressedValue) {
			let newValue = null;

			this.set('value', pressedValue);
			if (this.get('isRadio')) {
				newValue = pressedValue;
			}
			this.get('onChange')(newValue);
		}
	}
});
