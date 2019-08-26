import Component from '@ember/component';
import layout from '../../templates/components/bp-table/thead-cell';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { alias } from '@ember/object/computed';

export default Component.extend({
	layout,
	tagName: 'th',
	attributeBindings: ['style'],
	/**
	* @author Frank Wang
	* @property
	* @name value
	* @description 显示 th 中的内容
	* @type {String}
	* @default ''
	* @private
	*/
	value: alias('dealColumn.value'),
	dealColumn: computed('column', function () {
		let column = this.get('column'),
			align = column.align ? `text-align: ${column.align}` : '';

		return {
			value: htmlSafe(column.label),
			style: htmlSafe( align)
		};
	}),
	/**
	 * @author Frank Wang
	 * @property
	 * @name style
	 * @description 内联样式
	 * @type {String}
	 * @default ''
	 * @private
	*/
	style: alias('dealColumn.style')
});
