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
	 * seriesName
	 * @property seriesName
	 * @type {string}
	 * @default ''
	 * @public
	 */
	seriesName: '',
	/**
	 * chartData
	 * @property chartData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	chartData: A([]),
	// chartData: A([
	// 	{
	// 		name: '销售额',
	// 		date: ['2018Q1', '2018Q2', '2018Q3', '2018Q4', '2019Q1', '2019Q2', '2019Q3', '2019Q4'],
	// 		data: [782.0, 874.9, 787.0, 23.2, 25.6, 4135.6, 162.2, 4160],
	// 		yAxisIndex: 1
	// 	},
	// 	{
	// 		name: '指标',
	// 		date: ['2018Q1', '2018Q2', '2018Q3', '2018Q4', '2019Q1', '2019Q2', '2019Q3', '2019Q4'],
	// 		data: [3983, 3407, 2432, 965, 1177, 20.0, 263.4, 334.3],
	// 		yAxisIndex: 1
	// 	},
	// 	{
	// 		name: '指标达成率',
	// 		date: ['2018Q1', '2018Q2', '2018Q3', '2018Q4', '2019Q1', '2019Q2', '2019Q3', '2019Q4'],
	// 		data: [45.0, 52.2, 20.3, 34.4, 23.0, 12.5, 22.0, 6.2],
	// 		yAxisIndex: 0
	// 	}
	// ]),
	/**
	 * chartColor
	 * @property chartColor
	 * @type {Array}
	 * @default ['#505F79 ', '#97A0AF','#00C7E6']
	 * @public
	 */
	chartColor: A(['#505F79 ', '#97A0AF', '#00C7E6']),

	generateOption() {
		let { chartData, chartColor } =
			this.getProperties('chartData', 'chartColor'),
			series = A([]),
			yAxisRightMax = A([]),
			yAxisLeftMax = A([]);

		if (isEmpty(chartData)) {
			return;
		}
		series = chartData.map(ele => {
			if (ele.yAxisIndex === 1) {
				yAxisRightMax.push(...ele.data);
				return {
					name: ele.name,
					type: 'bar',
					yAxisIndex: 0,
					barWidth: '8px',
					data: ele.data,
					itemStyle: {
						barBorderRadius: [5, 5, 0, 0]
					}
				};
			}
			yAxisLeftMax.push(...ele.data);

			return {
				name: ele.name,
				type: 'line',
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#00C7E6'
						}, {
							offset: 1,
							color: '#fff'
						}])
					}
				},
				yAxisIndex: 1,
				data: ele.data
			};
		});
		// yAxisRightMax = Math.floor(Math.max(...yAxisRightMax) * 5 / 4);
		// yAxisLeftMax = Math.floor(Math.max(...yAxisLeftMax) * 5 / 4);

		return {
			grid: {
				top: 24,
				right: 42
			},
			tooltip: {
				trigger: 'axis'
				// axisPointer: {
				// 	type: 'cross',
				// 	crossStyle: {
				// 		color: '#999'
				// 	}
				// }
			},
			color: chartColor,
			legend: {
				x: 'center',
				y: 'bottom',
				data: chartData.map(ele => {
					return { name: ele.name, icon: 'circle' };
				}),
				textStyle: {
					fontSize: 14,
					color: '#7A869A'
				}
			},
			xAxis: [
				{
					type: 'category',
					data: chartData.get('firstObject').date,
					axisTick: {
						show: false,
						alignWithLabel: true
					},
					axisLabel: {
						color: '#7A869A'
					},
					axisLine: {
						lineStyle: {
							type: 'solid',
							color: '#EBECF0'
						}
					},
					nameGap: 24,
					nameTextStyle: {
						fontSize: 14,
						padding: 12
					},
					axisPointer: {
						lineStyle: {
							type: 'dashed',
							color: '#EBECF0'
						}
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					show: true,
					// name: '水量',
					min: 0,
					// max: yAxisRightMax,
					// interval: 50,
					axisLabel: {
						color: '#7A869A'
						// formatter: '{value}'
					},
					axisLine: {
						lineStyle: {
							type: 'solid',
							color: '#EBECF0'
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#D2D4D9',
							width: 1,
							type: 'dashed'
						}
					}
				},
				{
					type: 'value',
					name: '',
					min: 0,
					// max: yAxisLeftMax,
					// interval: 6,
					axisLabel: {
						color: '#7A869A',
						formatter: '{value} %'
					},
					axisLine: {
						lineStyle: {
							type: 'solid',
							color: '#EBECF0'
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#D2D4D9',
							width: 1,
							type: 'dashed'
						}
					}
				}
			],
			series
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
