import Component from '@ember/component';
import layout from '../../templates/components/bp-table/tbody';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import {equal} from '@ember/object/computed';
import BindingScroll from '../../mixins/binding-scroll';
import { isEmpty } from '@ember/utils';

export default Component.extend(BindingScroll,{
	layout,
	classNames:['bp-table-tbody-wrapper'],
	classNameBindings: ['isHover::hover-none'],
	attributeBindings:['style'],
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
	isHover: equal('hover', true),
	/**
	 * @author Frank Wang
	 * @property
	 * @name style
	 * @description wrapper's style
	 * @type {string}
	 * @default ''
	 * @private
	*/
	style: computed('height',function() {
		let height = this.get('height');

		if (isEmpty(height)) {
			return htmlSafe('');
		}
		return htmlSafe(`height:${height}px`);
	}),
	/**
	 * @author Frank Wang
	 * @property
	 * @name scrollPosition
	 * @description wrapper 内部的 ‘fixed’ table 随着滚动条的改变而发生的偏移
	 * @type {string}
	 * @default ''
	 * @private
	*/
	scrollPosition:computed('scrollTop',function() {
		let scrollTop = this.get('scrollTop');

		if (isEmpty(scrollTop)) {
			return htmlSafe('');
		}
		return htmlSafe(`transform: translateY(-${scrollTop}px)`);
	}),
	didInsertElement() {
		this._super(...arguments);
		this.bindScrolling(this.element);
	},
	willRemoveElement() {
		this.unbindScrolling(this.element);
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name onScrolled
	 * @description 监测内部滚动，并将滚动数据au
	 * @param scroll number
	 * @return {void}
	 * @example 创建例子。
	 * @public
	 */
	onScrolled() {},
	/**
	 * @author Frank Wang
	 * @method
	 * @name scrolled
	 * @description 监测内部滚动
	 * @param null
	 * @return {void}
	 * @example 创建例子。
	 * @private
	 */
	scrolled() {
		let scrollLeft = this.element.scrollLeft,
			scrollTop = this.element.scrollTop;

		// this.set('scrollTop',scrollTop);
		this.get('onScrolled')(scrollLeft,scrollTop);
	},
	/**
	 * @author Frank Wang
	 * @property
	 * @name currentTrIndex
	 * @description hover的tr的index
	 * @type {string|number}
	 * @default ''
	 * @public
	*/
	currentTrIndex:'',
	/**
	 * @author Frank Wang
	 * @method
	 * @name onMouseIO
	 * @description 将鼠标的 hover 状态提升到父组件中进行管理
	 * @param 鼠标hover的row的index
	 * @return {void}
	 * @example 创建例子。
	 * @public
	 */
	onMouseIO(){},
	actions: {
		mouseEnter(index) {
			this.get('onMouseIO')(index);
		},
		mouseLeave(index) {
			this.get('onMouseIO')(index);
		}
	}
});
