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
	 * stack
	 * @property stack
	 * @type {string}
	 * @default ''
	 * @public
	 */
	stack: 'stack',
	/**
	 * xAxisData
	 * @property xAxisData
	 * @type {string}
	 * @default ''
	 * @public
	 */
	xAxisData: A(['city1', 'city2', 'city3', 'city4', 'city5', 'city6']),
	/**
	 * chartData
	 * @property chartData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	chartData: A([{
		name: '蒸发量',
		type: 'bar',
		yAxisIndex: 1,
		data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7]
	},
	{
		name: '降水量',
		type: 'bar',
		yAxisIndex: 1,
		data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7]
	},
	{
		name: '平均温度',
		type: 'line',
		data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2]
	}]),
	/**
	 * chartColor
	 * @property chartColor
	 * @type {Array}
	 * @default ['#172B4D', '#F4F5F7']
	 * @public
	 */
	chartColor: A(['#73ABFF', '#2355A9', '#FFC400']),

	generateOption() {
		let { chartData, chartColor, xAxisData } =
			this.getProperties('chartData', 'chartColor', 'xAxisData'),
			yAxisBarMax = 0,
			yAxisLineMax = 0,
			totalBarData = A([]),
			totalLineData = A([]);


		if (isEmpty(chartData)) {
			return {};
		}
		totalBarData = chartData.map(ele => {
			if (ele.type === 'bar') {
				return ele.data;
			}
		}).reduce((result, ele) => result.concat(ele), []).filter(Boolean);

		totalLineData = chartData.map(ele => {
			if (ele.type !== 'bar') {
				return ele.data;
			}
		}).reduce((result, ele) => result.concat(ele), []).filter(Boolean);

		yAxisBarMax = Math.floor(Math.max(...totalBarData) * 5 / 4);

		yAxisLineMax = Math.floor(Math.max(...totalLineData) * 5 / 4);

		return {
			color: chartColor,
			backgroundColor: 'white',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					}
				}
			},
			toolbox: {
				show: false,
				feature: {
					dataView: { show: true, readOnly: false },
					magicType: { show: true, type: ['line', 'bar'] },
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			grid: {
				right: 200
			},
			legend: [{
				type: 'scroll',
				orient: 'vertical',
				itemWidth: 8,
				itemHeight: 8,
				right: 24,
				y: 50,
				padding: 5,
				itemGap: 15,
				icon: 'circle',
				textStyle: {
					//图例文字的样式
					color: '#7A869A',
					fontSize: 14
				},
				data: chartData.map(ele => {
					if (ele.type === 'bar') {
						return ele.name;
					}
					return false;
				}).filter(Boolean)
			},
			{
				type: 'scroll',
				orient: 'vertical',
				itemWidth: 16,
				itemHeight: 4,
				right: 24,
				y: 110,
				padding: 5,
				itemGap: 15,
				icon: 'rect',
				textStyle: {
					//图例文字的样式
					color: '#7A869A',
					fontSize: 14
				},
				data: chartData.map(ele => {
					if (ele.type !== 'bar') {
						return ele.name;
					}
					return false;
				}).filter(Boolean)
			}],
			xAxis: [
				{
					type: 'category',
					data: xAxisData,
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
						color: '#7A869A'
					},
					axisLine: {
						show: true,
						lineStyle: {
							type: 'solid',
							color: '#DFE1E6'
						}
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					min: 0,
					max: yAxisLineMax,
					// splitNumber: 8,
					// interval: yAxisLeftinterval,
					splitLine: {
						lineStyle: {
							type: 'dotted'
						}
					},
					axisLabel: {
						formatter: '{value} %',
						color: '#7A869A'
					},
					axisLine: {
						show: false,
						lineStyle: {
							type: 'solid',
							color: '#DFE1E6'
						}
					}
				},
				{
					type: 'value',
					min: 0,
					max: yAxisBarMax,
					// splitNumber: 8,
					// interval: yAxisRightinterval,
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
							type: 'solid',
							color: '#DFE1E6'
						}
					}
				}
			],
			series: chartData.map((ele) => {
				return {
					name: ele.name,
					type: ele.type,
					barGap: 0,
					yAxisIndex: ele.yAxisIndex,
					barWidth: 8,
					data: ele.data,
					itemStyle: {
						normal: {
							lineStyle: {
								width: 2,
								type: 'dotted'
							}
						}
					}
				};
			})

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
