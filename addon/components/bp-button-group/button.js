import Button from 'bp-components/components/bp-button';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';

export default Button.extend({
	/**
	 * @property groupValue
	 * @private
	 */
	groupValue: null,
	/**
	 * @property buttonGroupType
	 * @type string
	 * @private
	 */
	buttonGroupType: false,
	/**
	 * @property active
	 * @type boolean
	 * @readonly
	 * @private
	 */
	active: computed('buttonGroupType', 'groupValue', 'value', function () {
		let { value, groupValue } = this.getProperties('value', 'groupValue');

		if (this.get('buttonGroupType') === 'radio') {
			return value === groupValue;
		}
		if (isArray(groupValue)) {
			return groupValue.indexOf(value) !== -1;
		}
		return false;
	}).readOnly()
});