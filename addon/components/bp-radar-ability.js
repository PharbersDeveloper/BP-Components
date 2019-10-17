import Component from '@ember/component';
import layout from '../templates/components/bp-chart';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import echarts from 'echarts';
import $ from 'jquery';

export default Component.extend({
	layout,
	tagName: '',
	init() {
		this._super(...arguments);
		this.set('result', {});
		this.set('opts', {
			renderer: 'svg' // canvas of svg
		});
	},
	/**
	 * @author Frank Wang
	 * @property
	 * @name clickValue
	 * @description 用户点击雷达图坐标轴的name
	 * @type {String}
	 * @default ''
	 * @private
	*/
	clickValue: '区域划分能力',
	/**
	 * radar value max value
	 * @property maxValue
	 * @type {number}
	 * @default 3
	 * @public
	 */
	maxValue: 3,
	/**
	 * chart's color
	 * @property radarColor
	 * @type {Array}
	 * @default null
	 * @public
	 */
	radarColor: A(['rgba(43,69,113,1)', '#979797']),
	/**
	 * radar Data
	 * @property radarData
	 * @type {Array}
	 * @default
	 * @public
	 */
	radarData: A([
		{
			value: [2, 3, 1, 3, 1],
			name: '能力分析'
		}
	]),
	/**
	 * chart's title
	 * @property title
	 * @type {string}
	 * @default ''
	 * @public
	 */
	title: '',
	/**
	 * 是否有legend
	 * @property hasLegend
	 * @type {boolean}
	 * @default false
	 * @public
	 */
	hasLegend: false,
	/**
	 * 定义每一项
	 * @property items
	 * @type {Array}
	 * @default  ['工作积极性', '产品知识','行为有效性', '区域管理能力','销售能力']
	 * @public
	 */
	items: A(['区域划分能力', '领导力', '自我时间管理能力', '资源优化能力', '指标分配能力']),
	score: A(['B', 'A', 'S']),
	// score: A(['S', 'A', 'B', 'C', 'D']),

	/**
	 * @author Frank Wang
	 * @method
	 * @name getChartIns
	 * @description 获取 chart 的实例
	 * @param 该类/方法的参数，可重复定义。
	 * @return 该类/方法的返回类型。
	 * @example 创建例子。
	 * @public
	 */
	getChartIns() {
		const selector = `#${this.get('eid')}`,
			ele = $(selector),
			// echartInstance = echarts.getInstanceByDom(ele[0]);
			echartInstance = echarts.init(ele[0]);

		return echartInstance;
	},
	generateOption() {
		let { title, radarColor, hasLegend, radarData, maxValue, items, score,clickValue } =
			this.getProperties('title', 'radarColor', 'hasLegend', 'radarData', 'maxValue', 'items', 'score','clickValue'),
			legendData = null,
			legend = null,
			data = null,
			indicator = isEmpty(items) ? [] : items.map((ele, index) => {
				return { name: ele, max: maxValue, value: radarData[0].value[index] };
			});

		if (radarData.length === 1) {
			radarColor = ['#C1C7D0'];
		}
		data = radarData.map((ele, index) => {
			return {
				value: ele.value,
				name: ele.name
				// areaStyle: {
				// 	color: radarColor[index]
				// }
			};
		});
		legendData = radarData.map(ele => {
			return { name: ele.name, icon: 'circle' };
		});
		legend = {
			show: hasLegend,
			x: 'center',
			bottom: '0',
			orient: 'vertical',
			textStyle: {
				fontSize: '14px',
				color: '#7A869A'
			},
			data: legendData
		};
		return {
			title: {
				text: title
			},
			grid: {
				left: 'center',
				top: 'middle'
			},
			color: radarColor,
			tooltip: {
				show: false
			},
			legend,
			radar: {
				radius: '65%',
				name: {
					formatter: function (value, indi) {
						let code = score[indi.value - 1],
							newValue = value;

						if (value.length > 6) {
					        newValue = value.slice(0,6)+'\n'+value.slice(6);
					    }
						if (value === clickValue) {
							return `{h|${code}}\n{b|${newValue}}`;
						}
						return `{a|${code}}\n{b|${newValue}}`;
					},
					rich: {
						a: {
							color: '#579AFF',
							fontSize: 20,
							lineHeight: 28,
							align: 'center',
							backgroundColor: 'rgba(9,30,66,0.04)',
							width: 37,
							height: 24,
							borderRadius: 4
						},
						h: {
							color: '#fff',
							fontSize: 20,
							lineHeight: 28,
							align: 'center',
							backgroundColor: '#579AFF',
							width: 37,
							height: 24,
							borderRadius: 4
						},
						b: {
							color: '#344563',
							fontSize: 14,
							lineHeight: 20,
							align: 'center'
						}
					},
					textStyle: {
						color: '#7A869A',
						borderRadius: 3,
						padding: [0, 0]
					}
				},
				indicator,
				triggerEvent: true,
				splitNumber: 3, //default
				axisLine: {
					lineStyle: {
						color: '#DFE1E6'
					}
				},
				splitLine: {
					lineStyle: {
						color: '#DFE1E6'
					}
				},
				splitArea: {
					areaStyle: {
						color: ['#fff', '#fff']
					}
				}
			},
			series: [{
				name: '',
				type: 'radar',
				data,
				// itemStyle: {normal: {areaStyle: {type: 'default',color:'green'}}},
				areaStyle: {
					color: 'rgba(0,45,122,0.40)'
				},
				symbol: 'none'
			}]
		};
	},
	reGenerateChart(option) {
		const opts = this.get('opts'),
			echartInstance = this.getChartIns();

		if (isEmpty(echartInstance)) {
			this.set('result', option);
		} else {
			echartInstance.clear();
			if (!isEmpty(option)) {
				echartInstance.setOption(option, opts);

			} else {
				echartInstance.setOption({}, opts);
			}
		}
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name clickAxisName
	 * @description 对雷达图坐标轴的名称点击事件
	 * @param 坐标轴的相关属性
	 * @return {void}
	 * @example 创建例子。
	 * @private
	 */
	clickAxisName(params) {
		let targetType = params.targetType || false;

		if (targetType === 'axisName') {
			this.set('clickValue',this.GetChinese(params.name));

			let option = this.generateOption();

			this.get('onClick')(this.get('clickValue'));
			this.reGenerateChart(option);

			return;
		}
	},
	onClick(){},
	GetChinese(strValue) {
		if (!isEmpty(strValue)) {
			var reg = /[\u4e00-\u9fa5]/g;

			return strValue.match(reg).join('');
		}
		return '';
	},

	didInsertElement() {
		this._super(...arguments);
		const that = this;

		let echartInstance = this.getChartIns(),
		 option = this.generateOption();

		 echartInstance.on('click', function (params) {
			that.clickAxisName(params);
		});
		this.reGenerateChart(option);
	}
	// didUpdateAttrs() {
	// 	this._super(...arguments);
	// 	let option = this.generateOption();

	// 	this.reGenerateChart(option);
	// }
});
