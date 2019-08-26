import Component from '@ember/component';
import layout from '../../templates/components/bp-table/tbody';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import {equal} from '@ember/object/computed';

export default Component.extend({
	layout,
	classNames:['bp-table-tbody-wrapper'],
	classNameBindings: ['isHover:row-hover'],
	/**
	* @author Frank Wang
	* @property
	* @name columns
	* @description 此表格对应的表头数据及配置信息
	* @type {Array}
	* @default []
	* @public
	*/
	columns: A([]),
	/**
	 * @author Frank Wang
	 * @property
	 * @name bodyData
	 * @description 需要展示的表格数据
	 * @type {Array}
	 * @default []
	 * @public
	*/
	bodyData: A([]),
	/**
	 * @author Frank Wang
	 * @property
	 * @name hasBorder
	 * @description add's border for td
	 * @type {String}
	 * @default ''
	 * @private
	*/
	hasBorder: computed('border', function () {

		let border = this.get('border');

		return htmlSafe(border ? `border-bottom: 0.5px solid rgba(9,30,66,0.08);` : '');

	}),
	/**
	 * @author Frank Wang
	 * @property
	 * @name hover
	 * @description 为 row 添加 hover 样式
	 * @type {Boolean}
	 * @default true
	 * @public
	*/
	hover: true,
	/**
	 * @author Frank Wang
	 * @property
	 * @name isHover
	 * @description 为 row 添加 hover 样式
	 * @type {Boolean}
	 * @default false
	 * @private
	*/
	isHover: equal('hover', true)
});
