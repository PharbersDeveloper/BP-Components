import Component from '@ember/component';
import layout from '../../templates/components/bp-table/colgroup-cell';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
export default Component.extend({
	layout,
	tagName: 'col',
	attributeBindings:['style','width'],
	/**
	* @author Frank Wang
	* @property
	* @name column
	* @description 列配置信息
	* @type {Obejct}
	* @default null
	* @public
	*/
	column: null,
	/**
	 * @author Frank Wang
	 * @property
	 * @name style
	 * @description 对列配置信息进行分析获取
	 * @type {Object}
	 * @default {}
	 * @private
	*/
	style: computed('column',function() {
		let column = this.get('column'),
			style = column.align?`text-align:${column.align}`:'';

		return htmlSafe(style);

	}),
	width: computed('column',function() {
		let column = this.get('column'),
			width = column.width?` ${column.width}`:'';

		return htmlSafe(width);
	})

});
