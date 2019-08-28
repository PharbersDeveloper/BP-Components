import Component from '@ember/component';
import layout from '../../templates/components/bp-table/thead-cell';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { alias } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';

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
	flexAlign:alias('dealColumn.flexAlign'),
	dealColumn: computed('column', function () {
		let column = this.get('column'),
			align = column.align ? `text-align: ${column.align}` : '',
			flexAlign = '',
			sortAble = column.sortable?`cursor:pointer`:``;

		if (column.align) {
			if (column.align === 'left') {
				flexAlign = `flex-start`;
			} else if (column.align === 'center') {
				flexAlign = `center`;
			} else if (column.align === 'right') {
				flexAlign = `flex-end`;
			}
		} else {
			flexAlign = `flex-start`;
		}
		return {
			value: htmlSafe(column.label),
			style: htmlSafe(align+';'+sortAble),
			flexAlign:htmlSafe(`justify-content:${flexAlign}`),
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
	 * @property
	 * @name sortOrder
	 * @description 排序方向，false asc / true des
	 * @type {boolean}
	 * @default null
	 * @public
	*/
	sortOrder: null,
	/**
	 * @author Frank Wang
	 * @property
	 * @name sortItem
	 * @description 当前需要进行排序的 item
	 * @type {Object}
	 * @default null
	 * @public
	*/
	sortItem:null,
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

		if (!sortable) {
			return;
		}

		if (this.get('sortOrder') === null) {
			this.set('sortOrder',false);
		} else {
			this.toggleProperty('sortOrder');
		}

		this.get('onClick')(this.column,this.sortOrder);
	},
	sortIcon: computed('sortItem','sortOrder',function() {
		let column = this.get('column'),
			sortItem = this.get('sortItem'),
			sortOrder = this.get('sortOrder');

		switch (true) {
		case isEmpty(sortItem) ||sortItem.valuePath !== column.valuePath:
			this.set('sortOrder',null);
			return 'sort-default';
		case !sortOrder:
			return 'sort-asc';
		case sortOrder:
			return 'sort-des';
		default:
			break;
		}
		// 当 sortItem 与当前的相同切 sortOrder 为false的时候

	})
});
