import Component from '@ember/component';
import layout from '../templates/components/bp-table';
import { htmlSafe } from '@ember/template';
// import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
// import Table from 'ember-light-table';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import { getScrollbarWidth } from '../utils/scrollbar';
import { alias } from '@ember/object/computed';
export default Component.extend({
	layout,
	classNames: ['table-area', 'bp-table'],
	classNameBindings: ['wrapperShadow::wrapper-shadow'],
	attributeBindings: ['style'],
	/**
	 * @author Frank Wang
	 * @property
	 * @name width
	 * @description wrapper's width
	 * @type {Number/String}
	 * @default '100%'
	 * @public
	*/
	width: '100%',
	/**
	 * @author Frank Wang
	 * @property
	 * @name height
	 * @description wrapper's height
	 * @type {Number/String}
	 * @default 'inherit'
	 * @public
	*/
	height: 'inherit',
	/**
	 * @author Frank Wang
	 * @property
	 * @name rowBorder
	 * @description 是否为tbody 添加 border-bottom
	 * @type {Boolean}
	 * @default false
	 * @public
	*/
	rowBorder: false,
	/**
	   * @author Frank Wang
	   * @property
	   * @name rowHover
	   * @description 为 body 的 row 添加 hover 样式
	   * @type {Boolean}
	   * @default true
	   * @public
	  */
	rowHover: true,
	style: computed('width,maxWidth,height', function () {
		let { width, maxWidth, height } = this.getProperties('width', 'maxWidth', 'height'),
			styles = '';

		styles = isEmpty(width) ? '' : 'width:' + width + (isEmpty(maxWidth) ? '' : `max-width:${maxWidth}`) + ';' +
			(isEmpty(height) ? '' : `height:${height}`);

		return htmlSafe(styles);
	}),
	/**
	 * @author Frank Wang
	 * @property
	 * @name fixedWrapperStyle
	 * @description 固定列的宽度
	 * @type {String}
	 * @default ''
	 * @public
	*/
	fixedWrapperStyle: computed('columns.@each', 'scrollbarWidth', function () {
		let column = this.get('columns') ? this.get('columns')[0] : { width: 0 },
			width = column.width,
			scrollbarWidth = this.get('scrollbarWidth');

		return htmlSafe(`width:${width}px;height:calc(100% - ${scrollbarWidth}px)`);
	}),
	wrapperShadow: computed('scrollLeft', function () {
		let scrollLeft = this.get('scrollLeft');

		return scrollLeft === 0 || isEmpty(scrollLeft);
	}),
	/**
	 * @author Frank Wang
	 * @property
	 * @name currentSortItem
	 * @description 当前选中的要排序的列的 column
	 * @type {Object}
	 * @default null
	 * @private
	*/
	currentSortItem: null,
	/**
	 * @author Frank Wang
	 * @property
	 * @name defaultSort
	 * @description 默认排序的 item 的value 值
	 * @type {string}
	 * @default ""
	 * @public
	*/
	defaultSort: '',
	/**
	 * @author Frank Wang
	 * @property
	 * @name defaultSortItem
	 * @description default sort item
	 * @type {Object}
	 * @default null
	 * @private
	*/
	defaultsortItem: computed('defaultSort', function () {
		let value = this.get('defaultSort');

		console.log(value);
		if (isEmpty(value)) {
			return null;
		}
		console.log( this.get('columns').findBy('valuePath', value));
		return this.get('columns').findBy('valuePath', value);

	}),
	fixedTbodyStyle: alias('computedHeight.fixedTbodyStyle'),
	tbodyHeight: alias('computedHeight.tbodyHeight'),
	computedHeight: computed('theadHeight', function () {
		// let ele = this.get('element'),
		// eleHeight = ele.offsetHeight,
		let theadHeight = this.get('theadHeight');

		return {
			// tbodyHeight: eleHeight - theadHeight,
			tbodyHeight: `calc(100% - ${theadHeight}px)`,
			fixedTbodyStyle: htmlSafe(`top:${theadHeight}px`)
		};
	}),
	copyData: computed('data', function () {
		return this.get('data');
	}),
	actions: {
		scrollPosition(left, top) {
			this.set('scrollLeft', left);
			this.set('scrollTop', top);
		},
		getTheadHeight(height) {
			this.set('theadHeight', height);
		},
		sortClick(item, sortOrder) {
			let data = this.get('copyData'),
				resortData = A([]);

			this.set('currentSortItem', item);

			if (sortOrder) {
				resortData = data.sortBy(item.valuePath).reverse();

			} else {
				resortData = data.sortBy(item.valuePath);

			}
			this.set('copyData', resortData);
		}
	},
	didInsertElement() {
		this._super(...arguments);

		this.set('scrollbarWidth', getScrollbarWidth());
	},
	didReceiveAttrs() {
		this._super(...arguments);

		let defaultSortItem = this.get('defaultsortItem');

		if (!isEmpty(defaultSortItem)) {
			this.get('actions').sortClick.bind(this)(defaultSortItem,false);
		}

	},
	didUpdateAttrs() {

		this._super(...arguments);
		this.set('currentSortItem', null);
		this.set('copyData', this.get('data'));
	}
});
