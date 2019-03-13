import Component from '@ember/component';
import layout from '../../templates/components/bp-progress/bar';
import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
	layout,
	classNames: ['bp-progress-bar'],
	attributeBindings: ['style', 'ariaValuenow', 'ariaValuemin', 'ariaValuemax'],

	/**
	 * minValue
	 * @property minValue
	 * @type number
	 * @default 0
	 * @public
	 */
	minValue: 0,
	/**
	 * maxValue
	 * @property maxValue
	 * @type number
	 * @default 100
	 * @public
	 */
	maxValue: 100,
	/**
	 * percent value
	 * @property value
	 * @type number
	 * @default 0
	 * @public
	 */
	value: 0,
	/**
	 * show label
	 * @property showLabel
	 * @type boolean
	 * @default false
	 * @public
	 */
	showLabel: false,

	ariaValuenow: readOnly('value'),
	ariaValuemin: readOnly('minValue'),
	ariaValuemax: readOnly('maxValue'),
	/**
	 * The percentage of `value`
	 *
	 * @property percent
	 * @type number
	 * @protected
	 * @readonly
	 */
	percent: computed('value', 'minValue', 'maxValue', function () {
		let value = parseFloat(this.get('value')),
			minValue = parseFloat(this.get('minValue')),
			maxValue = parseFloat(this.get('maxValue'));

		return Math.min(Math.max((value - minValue) / (maxValue - minValue), 0), 1) * 100;
	}).readOnly(),
	/**
	 * @property style
	 * @type string
	 * @private
	 * @readonly
	 */
	style: computed('percent', function () {
		let percent = this.get('percent');

		return htmlSafe(`width: ${percent}%`);
	})
});
