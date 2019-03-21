import BPRadio from 'bp-components/components/bp-radio';
import layout from '../templates/components/bp-radio-index';
import { computed } from '@ember/object';

export default BPRadio.extend({
	layout,
	/**
	 * 当前选中的选项的index 值
	 * @property curValueIndex
	 * @type {number}
	 * @default 0
	 * @public
	 */
	curValueIndex: 0,
	/**
	 * 当前选中的选项的 index 值
	 * @property curValue
	 * @type {string|object}
	 * @default null
	 * @public
	 */
	curValue: computed('curValueIndex', function () {
		let { radios, curValueIndex } = this.getProperties('radios', 'curValueIndex');

		curValueIndex = curValueIndex || 0;

		return radios[curValueIndex];
	}),
	actions: {
		changeValue(item) {
			let radios = this.get('radios');

			this.set('curValueIndex', radios.indexOf(item));
		}
	}
});
