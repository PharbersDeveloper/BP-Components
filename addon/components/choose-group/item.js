import Component from '@ember/component';
import layout from '../../templates/components/choose-group/item';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isArray } from '@ember/array';

export default Component.extend({
	layout,
	tagName: 'label',
	radio: null,
	classNames: ['private-choose-item'],
	classNameBindings: ['block', 'active'],
	/**
	 * Property to block level item
	 * @property block
	 * @type boolean
	 * @default false
	 * @public
	 */
	block: false,
	/**
	 * bubble
	 * @property bubble
	 * @type boolean
	 * @default false
	 * @public
	 */
	bubble: false,
	/**
	 * onChoose
	 * @public
	 */
	onChoose() { },

	/**
	 * @private
	 */
	click() {
		let action = this.get('onChoose');

		action(this.get('radio'));

		return this.get('bubble');
	},

	/**
	 * @property groupValue
	 * @private
	 */
	groupValue: null,

	/**
	 * @property chooseGroupType
	 * @type string
	 * @private
	 */
	chooseGroupType: '',
	isRadio: equal('chooseGroupType', 'radio'),
	/**
	 * item是否是object 类型
	 * @property isOnlyValue
	 * @type {boolean}
	 * @default true
	 * @private
	 */
	itemIsObject: computed('value', function () {
		let value = this.get('radio'),
			valueType = typeof value;

		return valueType === 'object';
	}),
	/**
	 * @property active
	 * @type boolean
	 * @readonly
	 * @private
	 */
	active: computed('chooseGroupType', 'groupValue', 'value', function () {
		let value = this.get('radio'),
			groupValue = this.get('groupValue'),
			valueType = typeof value;

		if (this.get('chooseGroupType') === 'radio') {

			if (!value || !groupValue) {
				return false;
			}
			if (valueType === 'string') {
				return value === groupValue;
			} else if (typeof value.id !== 'undefined') {
				return value.id === groupValue.id;
			}
			return value.value === groupValue.value;
		}

		if (isArray(groupValue)) {
			return groupValue.indexOf(value) !== -1;
		}

		return false;
	}).readOnly()
});
