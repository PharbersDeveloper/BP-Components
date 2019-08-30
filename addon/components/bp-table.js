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

		styles = isEmpty(width) ? '' : 'width:' + width + (isEmpty(maxWidth) ? '' : `max-width:${maxWidth}`) +';'+
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

		return scrollLeft === 0||isEmpty(scrollLeft);
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
	currentSortItem:null,
	fixedTbodyStyle:alias('computedHeight.fixedTbodyStyle'),
	tbodyHeight: alias('computedHeight.tbodyHeight'),
	computedHeight: computed('theadHeight',function() {
		let ele = this.get('element'),
			eleHeight = ele.offsetHeight,
			theadHeight = this.get('theadHeight');

		return {
			tbodyHeight:eleHeight-theadHeight,
			fixedTbodyStyle: htmlSafe(`top:${theadHeight}px`)
		};
	}),
	copyData: computed('data',function() {
		return this.get('data');
	}),
	// tbodyHeight: computed('theadHeight',function() {
	// 	let ele = this.get('element'),
	// 		eleHeight = ele.offsetHeight,
	// 		theadHeight = this.get('theadHeight');

	// 	console.log(eleHeight-theadHeight);
	// 	return eleHeight-theadHeight;
	// }),
	// iconSortable: 'sort',
	// iconAscending: 'sort-up',
	// iconDescending: 'sort-down',
	// iconComponent: 'sort-icon',
	// sortIcons: computed('iconSortable', 'iconAscending', 'iconDescending', 'iconComponent', function () {
	//   return this.getProperties(['iconSortable', 'iconAscending', 'iconDescending', 'iconComponent']);
	// }).readOnly(),
	// sort: '',
	// dir: 'asc',
	// sortedModel: sort('model', 'sortBy').readOnly(),
	// sortBy: computed('dir', 'sort', function () {
	//   return [`${this.get('sort')}:${this.get('dir')}`];
	// }).readOnly(),
	// setRows: function (rows, thisInstance) {
	//   thisInstance.get('table').setRows([]);
	//   thisInstance.get('table').setRows(rows);
	// },
	// filterAndSortModel(thisInstance) {
	//   let model = thisInstance.get('sortedModel');

	//   thisInstance.get('setRows')(model, thisInstance);
	// },

	// table: computed('model', function () {
	//   let handledData = [],
	//     data = this.get('model');

	//     handledData = [{
	//       date: '2016-05-02',
	//       name: '王小虎',
	//       address: '上海市普陀区金沙江路 1518 弄'
	//     }, {
	//       date: '2016-05-04',
	//       name: '王小虎',
	//       address: '上海市普陀区金沙江路 1517 弄'
	//     }, {
	//       date: '2016-05-01',
	//       name: '王小虎',
	//       address: '上海市普陀区金沙江路 1519 弄'
	//     }, {
	//       date: '2016-05-03',
	//       name: '王小虎',
	//       address: '上海市普陀区金沙江路 1516 弄'
	//     }, {
	//       date: '2016-05-02',
	//       name: '王小虎',
	//       address: '上海市普陀区金沙江路 1518 弄'
	//     }, {
	//       date: '2016-05-04',
	//       name: '王小虎',
	//       address: '上海市普陀区金沙江路 1517 弄'
	//     }, {
	//       date: '2016-05-01',
	//       name: '王小虎',
	//       address: '上海市普陀区金沙江路 1519 弄'
	//     }, {
	//       date: '2016-05-03',
	//       name: '王小虎',
	//       address: '上海市普陀区金沙江路 1516 弄'
	//     }];
	//   // if (isEmpty(data)) {
	//   //   return new Table(this.get('columns'), handledData);
	//   // }

	//   return new Table(this.get('columns'), handledData);
	// }),
	// actions: {
	//   sortColumn(column) {
	//     if (column.sortable) {
	//       this.setProperties({
	//         dir: column.ascending ? 'asc' : 'desc',
	//         sort: column.get('valuePath')
	//       });
	//       // this.set('sort', column.get('valuePath'));
	//       this.get('filterAndSortModel')(this);
	//     }
	//   },
	//   onColumnClick(column) {
	//     if (column.sorted) {
	//       this.setProperties({
	//         dir: column.ascending ? 'asc' : 'desc',
	//         sort: column.get('valuePath')
	//       });
	//       // this.set('sort', column.get('valuePath'));
	//       this.get('filterAndSortModel')(this);
	//     }
	//   },
	//   onAfterResponsiveChange(matches) {
	//     if (matches.indexOf('jumbo') > -1) {
	//       this.get('table.expandedRows').setEach('expanded', false);
	//     }
	//   },
	//   onScrolledToBottom() {
	//     if (this.get('canLoadMore')) {
	//       this.incrementProperty('page');
	//       this.get('fetchRecords').perform();
	//     }
	//   }
	// }
	actions: {
		scrollPosition(left,top) {
			this.set('scrollLeft',left);
			this.set('scrollTop',top);
		},
		getTheadHeight(height) {
			this.set('theadHeight',height);
		},
		sortClick(item,sortOrder) {
			let data = this.get('copyData'),
				resortData = A([]);

			this.set('currentSortItem',item);

			if (sortOrder) {
				resortData = data.sortBy(item.valuePath).reverse();

			} else {
				resortData = data.sortBy(item.valuePath);

			}
			this.set('copyData',resortData);
		}
	},
	didInsertElement() {
		this._super(...arguments);
		this.set('scrollbarWidth', getScrollbarWidth());
	},
	didUpdateAttrs() {
		this._super(...arguments);
		this.set('currentSortItem',null);
		this.set('copyData',this.get('data'));

	}
});
