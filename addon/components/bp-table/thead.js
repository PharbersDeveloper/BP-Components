import Component from '@ember/component';
import layout from '../../templates/components/bp-table/thead';
import {A} from '@ember/array';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { isEmpty } from '@ember/utils';

export default Component.extend({
	layout,
	classNames:['bp-table-thead-wrapper'],
	attributeBindings: ['style'],
	/**
	* @author Frank Wang
	* @property
	* @name columns
	* @description 需要展示的 columns 数组
	* @type {Array}
	* @default []
	* @public
	*/
	columns:A([]),
	/**
	 * @author Frank Wang
	 * @property
	 * @name style
	 * @description thead style
	 * @type {String}
	 * @default ''
	 * @public
	*/
	style: computed('scrollLeft',function() {
		let scrollLeft = this.get('scrollLeft');

		if (isEmpty(scrollLeft)) {
			return htmlSafe('');
		}

		return htmlSafe(`transform:translateX(-${scrollLeft}px)`);
	}),
	/**
	 * @author Frank Wang
	 * @property
	 * @name sortItem
	 * @description 当前排序的 column
	 * @type {Object}
	 * @default null
	 * @private
	*/
	sortItem:null,
	/**
	 * @author Frank Wang
	 * @method
	 * @name onSortClick
	 * @description 将排序动作传递到最顶层
	 * @param item 当前排序的 item 对象
	 * @param sortOrder 排序顺序（false asc true desc）
	 * @return {void}
	 * @example 创建例子。
	 * @public
	 */
	onSortClick() {},
	/**
	 * @author Frank Wang
	 * @method
	 * @name onComputedHeight
	 * @description 计算此dom的高度
	 * @param height
	 * @return {void}
	 * @example 创建例子。
	 * @public
	 */
	onComputedHeight() {},
	actions: {
		theadCellClick(item,sortOrder) {
			// this.set('currentSortItem',item);
			this.get('onSortClick')(item,sortOrder);
		}
	},

	didInsertElement() {
		this._super(...arguments);
		let ele = this.get('element');

		this.get('onComputedHeight')(ele.offsetHeight);
	}
});
