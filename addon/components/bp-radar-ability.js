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
			renderer: 'canvas' // canvas of svg
		});
	},
	/**
	 * radar value max value
	 * @property maxValue
	 * @type {number}
	 * @default 5
	 * @public
	 */
	maxValue: 5,
	/**
	 * chart's color
	 * @property radarColor
	 * @type {Array}
	 * @default null
	 * @public
	 */
	radarColor: A(['#3172E0', '#979797']),
	/**
	 * radar Data
	 * @property radarData
	 * @type {Array}
	 * @default
	 * @public
	 */
	radarData: A([
		{
			value: [0, 0, 0, 0, 0],
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
	score: A(['D', 'C', 'B', 'A', 'S']),
	generateOption() {
		let { title, radarColor, hasLegend, radarData, maxValue, items, score } =
			this.getProperties('title', 'radarColor', 'hasLegend', 'radarData', 'maxValue', 'items', 'score'),
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
				name: ele.name,
				areaStyle: {
					color: radarColor[index]
				}
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
				left: 'center'
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
						let code = score[indi.value - 1];

						return `{a|${code}}\n{b|${value}}`;
					},
					rich: {
						a: {
							color: '#172B4D',
							fontSize: 20,
							lineHeight: 28,
							align: 'center'
						},
						b: {
							color: '#344563',
							fontSize: 14,
							lineHeight: 20
						}
					},
					textStyle: {
						color: '#7A869A',
						borderRadius: 3,
						padding: [0, 0]
					}
				},
				indicator,
				splitNumber: 5, //default
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
				data
			}]
		};
	},
	reGenerateChart(self, option) {
		const selector = `#${this.get('eid')}`,
			$el = $(selector),
			opts = this.get('opts'),
			echartInstance = echarts.getInstanceByDom($el[0]);

		if (isEmpty(echartInstance)) {
			self.set('result', option);
		} else {
			echartInstance.clear();
			if (!isEmpty(option)) {
				echartInstance.setOption(option, opts);
			} else {
				echartInstance.setOption({}, opts);
			}
		}
	},
	didInsertElement() {
		this._super(...arguments);
		let option = this.generateOption();

		this.reGenerateChart(this, option);
		// this.set('result', option);
	},
	didUpdateAttrs() {
		this._super(...arguments);
		let option = this.generateOption();

		this.reGenerateChart(this, option);
	}
});
