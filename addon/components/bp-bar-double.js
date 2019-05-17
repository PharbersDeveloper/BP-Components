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
	 * xData
	 * @property xData
	 * @type {string}
	 * @default ''
	 * @public
	 */
	xData: A(['city1', 'city2', 'city3', 'city4', 'city5', 'city6']),
	/**
	 * chartData
	 * @property chartData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	chartData: A([{
		name: '蒸发量',
		data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7]
	}, {
		name: '降水量',
		data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7]
	}]),
	/**
	 * chartColor
	 * @property chartColor
	 * @type {Array}
	 * @default ['#172B4D', '#F4F5F7']
	 * @public
	 */
	chartColor: A(['#4C9AFF', '#FFE380']),

	generateOption() {
		let { title, chartData, chartColor, stack, xData } =
			this.getProperties('title', 'chartData', 'chartColor', 'stack', 'xData'),
			seriesData = A([]);

		seriesData = chartData.map(ele => {
			return {
				name: ele.name,
				type: 'bar',
				barWidth: 24,
				stack,
				data: ele.data
			};
		});
		return {
			color: chartColor,
			backgroundColor: 'white',
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			xAxis: [
				{
					type: 'category',
					data: xData,
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
					max: yAxisLeftMax,
					//interval: yAxisLeftinterval,
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
					max: yAxisRightMax,
					//interval: yAxisRightinterval,
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
			series: chartData.map(ele => {
				return {
					name: ele.name,
					type: 'bar',
					barGap: 0,
					barWidth: 8,
					data: ele.data
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
