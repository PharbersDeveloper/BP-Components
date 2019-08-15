import Component from '@ember/component';
import layout from '../templates/components/bp-table';
import { htmlSafe } from '@ember/template';

import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import Table from 'ember-light-table';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  layout,
  classNames: ['table-area'],
  //   classNames: ['bp-table'],
  //   attributeBindings: ['style'],
  //   /**
  //    * @author Frank Wang
  //    * @property
  //    * @name width
  //    * @description wrapper's width
  //    * @type {Number/String}
  //    * @default '100%'
  //    * @public
  //   */
  //   width: '100%',
  /**
   * @author Frank Wang
   * @property
   * @name bodyBorder
   * @description 是否为tbody 添加 border-bottom
   * @type {Boolean}
   * @default false
   * @public
  */
  bodyBorder: true,
  //   /**
  //    * @author Frank Wang
  //    * @property
  //    * @name rowHover
  //    * @description 为 body 的 row 添加 hover 样式
  //    * @type {Boolean}
  //    * @default true
  //    * @public
  //   */
  //  rowHover: true,
  //   style:computed('width,maxWidth,height',function() {
  //     let {width,maxWidth,height} = this.getProperties('width','maxWidth','height'),
  //       styles = '';

  //       styles = isEmpty(width)?'':'width:'+width + (isEmpty(maxWidth)?'':`max-width:${maxWidth}`)+
  //       (isEmpty(height)?'':`height:${height}`);

  //     return htmlSafe(styles)
  //   }),
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
  columns: computed(function () {
    return [{
      label: '姓名',
      valuePath: 'name',
      // sortable: false,
      // width: '190px'
    }, 
    {
      label: '地址',
      valuePath: 'aa'
      // sortable: false
    },{
      label: '姓名',
      valuePath: 'bb'
      // sortable: false
    }, {
      label: '地址',
      valuePath: 'cc'
      // sortable: false
    },
    {
      label: '地址',
      valuePath: 'dd'
      // sortable: false
    },{
      label: '地址',
      valuePath: 'ee'
      // sortable: false
    },
    {
      label: '地址',
      valuePath: 'ff'
      // sortable: false
    },
    {
      label: '地址',
      valuePath: 'hh'
      // sortable: false
    },
    {
      label: '地址',
      valuePath: 'ii'
      // sortable: false
    },
    {
      label: '地址',
      valuePath: 'jj'
      // sortable: false
    },
    {
      label: '地址',
      valuePath: 'kk'
      // sortable: false
    },
    {
      label: '地址',
      valuePath: 'll'
      // sortable: false
    },
    {
      label: '地址',
      valuePath: 'mm'
      // sortable: false
    },
    {
      label: '地址',
      valuePath: 'nn'
      // sortable: false
    },
    {
      label: '地址',
      valuePath: 'oo'
      // sortable: false
    },
    {
      label: '地址',
      valuePath: 'pp'
      // sortable: false
    },

      // {
      //   label: '药品准入情况',
      //   valuePath: 'drugEntranceInfo'
      //   // sortable: false
      // }, {
      //   label: '上季度销售额',
      //   valuePath: 'sales',
      //   // cellComponent: 'light-table-format-number'
      //   // sortable: false
      // }, {
      //   label: '代表',
      //   valuePath: 'representative'
      //   // sortable: false
      // }, {
      //   label: '销售目标设定',
      //   valuePath: 'salesTarget',
      //   // cellComponent: 'light-table-format-number'
      //   // sortable: false
      // }, {
      //   label: '预算费用',
      //   valuePath: 'budget',
      //   // cellComponent: 'light-table-format-number'
      //   // sortable: false
      // }
    ];
  }),
  data: [{
    name: "宋楠",
    aa: "22,315",
    bb: "31.2%",
    cc: "16.0%",
    dd: "77.8%",
    ee: 0,
    ff: "-9.7%",
    gg: "32.6%",
    hh: "￥2,899,729",
    ii: "￥843,948",
    jj: "￥434,905",
    kk: "￥859,432",
    ll: "￥908,047",
    mm: "￥688,335",
    nn: "￥345,052",
    oo: "￥782,622",
    pp: "￥706,33"
  }, {
    name: "宋楠1",
    aa: "22,315",
    bb: "31.2%",
    cc: "16.0%",
    dd: "77.8%",
    ee: 0,
    ff: "-9.7%",
    gg: "32.6%",
    hh: "￥2,899,729",
    ii: "￥843,948",
    jj: "￥434,905",
    kk: "￥859,432",
    ll: "￥908,047",
    mm: "￥688,335",
    nn: "￥345,052",
    oo: "￥782,622",
    pp: "￥706,33"
  }, {
    name: "宋楠2",
    aa: "22,315",
    bb: "31.2%",
    cc: "16.0%",
    dd: "77.8%",
    ee: 0,
    ff: "-9.7%",
    gg: "32.6%",
    hh: "￥2,899,729",
    ii: "￥843,948",
    jj: "￥434,905",
    kk: "￥859,432",
    ll: "￥908,047",
    mm: "￥688,335",
    nn: "￥345,052",
    oo: "￥782,622",
    pp: "￥706,33"
  }, {
    name: "宋楠3",
    aa: "22,315",
    bb: "31.2%",
    cc: "16.0%",
    dd: "77.8%",
    ee: 0,
    ff: "-9.7%",
    gg: "32.6%",
    hh: "￥2,899,729",
    ii: "￥843,948",
    jj: "￥434,905",
    kk: "￥859,432",
    ll: "￥908,047",
    mm: "￥688,335",
    nn: "￥345,052",
    oo: "￥782,622",
    pp: "￥706,33"
  }, {
    name: "宋楠4",
    aa: "22,315",
    bb: "31.2%",
    cc: "16.0%",
    dd: "77.8%",
    ee: 0,
    ff: "-9.7%",
    gg: "32.6%",
    hh: "￥2,899,729",
    ii: "￥843,948",
    jj: "￥434,905",
    kk: "￥859,432",
    ll: "￥908,047",
    mm: "￥688,335",
    nn: "￥345,052",
    oo: "￥782,622",
    pp: "￥706,33"
  }, {
    name: "宋楠5",
    aa: "22,315",
    bb: "31.2%",
    cc: "16.0%",
    dd: "77.8%",
    ee: 0,
    ff: "-9.7%",
    gg: "32.6%",
    hh: "￥2,899,729",
    ii: "￥843,948",
    jj: "￥434,905",
    kk: "￥859,432",
    ll: "￥908,047",
    mm: "￥688,335",
    nn: "￥345,052",
    oo: "￥782,622",
    pp: "￥706,33"
  }, {
    name: "宋楠6",
    aa: "22,315",
    bb: "31.2%",
    cc: "16.0%",
    dd: "77.8%",
    ee: 0,
    ff: "-9.7%",
    gg: "32.6%",
    hh: "￥2,899,729",
    ii: "￥843,948",
    jj: "￥434,905",
    kk: "￥859,432",
    ll: "￥908,047",
    mm: "￥688,335",
    nn: "￥345,052",
    oo: "￥782,622",
    pp: "￥706,33"
  }],
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

});
