import Component from '@ember/component';
import layout from '../../templates/components/choose-group/item';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';

export default Component.extend({
	layout,
	tagName: 'section',
	radio: null,
	classNames: ['private-choose-item'],
	classNameBindings: ['block:item-block', 'active'],
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
	chooseGroupType: false,

	/**
	 * @property active
	 * @type boolean
	 * @readonly
	 * @private
	 */
	active: computed('chooseGroupType', 'groupValue', 'value', function () {
		let value = this.get('radio'),
			groupValue = this.get('groupValue');

		if (this.get('chooseGroupType') === 'radio') {

			if (!value || !groupValue) {
				return false;
			}
			if (typeof value.id !== 'undefined') {
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
