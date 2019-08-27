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
			align = column.align ? `text-align: ${column.align}` : '',
			sortAble = column.sortable?`cursor:pointer`:``;

		return {
			value: htmlSafe(column.label),
			style: htmlSafe(align+';'+sortAble),
			sortable: column.sortable
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
	style: alias('dealColumn.style'),
	/**
	 * @author Frank Wang
	 * @property
	 * @name sortable
	 * @description 是否可以排序
	 * @type {Boolean}
	 * @default false
	 * @public
	*/
	sortable: alias('dealColumn.sortable'),
	/**
	 * @author Frank Wang
	 * @method
	 * @name onClick
	 * @description 点击事件
	 * @param null
	 * @return {void}
	 * @example 创建例子。
	 * @public
	 */
	onClick() { },
	/**
	 * @author Frank Wang
	 * @method
	 * @name click
	 * @description 点击时间
	 * @param null
	 * @return {void}
	 * @example 创建例子。
	 * @private
	 */
	click() {
		let sortable = this.get('sortable');

		if (sortable) {
			console.log('sort');
			this.get('onClick')();
		}
	},
	sortIcon: computed(function() {
		return 'sort-default';
	})
});
