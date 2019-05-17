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
	xData: A(['Region1', 'Region2', 'Region3', 'Region4', 'Region5', 'Region6']),
	/**
	 * chartData
	 * @property chartData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	chartData: A([
		{ name: 'keyong', data: [5, 20, 36, 10, 10, 20] },
		{ name: 'bukeyong', data: [40, 22, 18, 35, 42, 40] },
		{ name: 'qita', data: [40, 22, 18, 35, 42, 40] }]),
	/**
	 * chartColor
	 * @property chartColor
	 * @type {Array}
	 * @default ['#172B4D', '#F4F5F7']
	 * @public
	 */
	chartColor: A(['orange', 'green', 'red']),

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
			backgroundColor: 'white',
			color: chartColor,
			title: {
				text: title,
				left: '20px',
				textStyle: {
					color: '#436EEE',
					fontSize: 14
				}
			},
			tooltip: {
				trigger: 'axis'
			},
			grid: {
				right: 200
			},
			legend: {
				type: 'scroll',
				orient: 'vertical',
				itemWidth: 8,
				itemHeight: 8,
				right: 24,
				y: 'center',
				padding: 5,
				icon: 'circle',
				data: chartData.map(ele => ele.name)
			},
			xAxis: {
				data: xData,
				splitLine: {
					show: false
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
			},
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
					show: true,
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
