import Component from '@ember/component';
import layout from '../../templates/components/bp-table/cell';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
	layout,
	tagName: 'td',
	attributeBindings: ['style'],
	/**
	 * @author Frank Wang
	 * @property
	 * @name style
	 * @description 内联样式
	 * @type {String}
	 * @default ''
	 * @private
	*/
	style: computed('column', function () {
		let column = this.get('column'),
			align = column.align ? `text-align: ${column.align}` : '';

		return htmlSafe( align);
	})
});
