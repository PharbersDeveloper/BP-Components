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
	 * title
	 * @property title
	 * @type {string}
	 * @default ''
	 * @public
	 */
	title: '',
	/**
	 * 圆圈的底数
	 * @property baseNumber
	 * @type {number}
	 * @default 5e2
	 * @public
	 */
	baseNumber: 5e2,
	/**
	 * chartData
	 * @property chartData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	chartData: A([
		[[0, 0, 0, '']],
		[[0, 0, 0, '']],
		[[0, 0, 0, '']],
		[[0, 0, 0, '']],
		[[0, 0, 0, '']]
	]),
	/**
	 * chartColor
	 * @property chartColor
	 * @type {Array}
	 * @default ['#172B4D', '#F4F5F7']
	 * @public
	 */
	chartColor: A(['rgb(115,171,255)', 'rgb(121,226,242)',
		'rgb(121,242,192)', 'rgb(54,179,126)', 'rgb(255,227,128)',
		'rgb(255,171,0)', 'rgb(192,182,242)', 'rgb(101,84,192)',
		'rgb(255,189,173)', 'rgb(255,143,115)', 'rgb(35,85,169)']),

	generateColor(color) {
		let rgba = `rgba(${color.slice(4, -1)},0.3)`;

		return A([{
			offset: 0,
			color: rgba
		}, {
			offset: 1,
			color: color
		}]);
	},
	generateOption() {
		let { title, chartData, chartColor, baseNumber } =
			this.getProperties('title', 'chartData', 'chartColor', 'baseNumber'),
			that = this,
			seriesData = A([]);

		seriesData = chartData.map((ele, index) => {
			let currentColor = chartColor[index],
				color = that.generateColor(currentColor);

			return {
				data: ele,
				type: 'scatter',
				symbolSize: function (data) {
					return Math.sqrt(data[2]) / baseNumber;
				},
				label: {
					show: true,
					color: '#344563',
					formatter: function (param) {
						return param.data[3];
					},
					emphasis: {
						show: true,
						fontSize: 14,
						color: '#344563',
						formatter: function (param) {
							return param.data[3];
						},
						position: 'top'
					}
				},
				itemStyle: {
					normal: {
						shadowBlur: 10,
						shadowColor: `rgba(${currentColor.slice(4, -1)},0.3)`,
						shadowOffsetY: 5,
						color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, color)
					}
				}
			};
		});
		return {
			backgroundColor: 'white',
			title: { text: title },
			xAxis: {
				splitLine: {
					show: true,
					lineStyle: {
						color: '#DFE1E6',
						width: 1,
						type: 'dotted'
					}
				},
				axisLabel: {
					color: '#7A869A'
				},
				axisLine: {
					lineStyle: {
						type: 'dotted',
						color: '#DFE1E6'
					}
				}
			},
			// tooltip: {
			// 	trigger: 'axis',
			// 	axisPointer: {
			// 		type: 'cross'
			// 	}
			// },
			yAxis: {
				splitLine: {
					lineStyle: {
						type: 'dotted'
					}
				},
				axisLabel: {
					color: '#7A869A'
				},
				axisLine: {
					show: false,
					lineStyle: {
						type: 'dotted',
						color: '#DFE1E6'
					}
				}
			},
			series: seriesData
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
