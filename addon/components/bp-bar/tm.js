import Component from '@ember/component';
import layout from '../../templates/components/bp-chart';
import { formatNumber } from '../../helpers/format-number';
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
	 * bar chart's title
	 * @property title
	 * @type {string}
	 * @default ''
	 * @public
	 */
	title: '',
	/**
	 * bar chart's subtext
	 * @property subText
	 * @type {string}
	 * @default ''
	 * @public
	 */
	subText: '',
	/**
	 * bar Data
	 * @property barData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	// barData: A([]),
	barData: null,
	/**
	 * bar Color
	 * @property barColor
	 * @type {Array}
	 * @default ['#505F79']
	 * @public
	 */
	barColor: A(['#505F79']),

	generateOption() {
		let { title, barData, barColor } =
			this.getProperties('title', 'barData', 'barColor');

		return {
			title: [{
				text: title,
				fontWeight: 500,
				textStyle: {
					fontSize: 14,
					color: '#172B4D'
				}
			}, {
				text: barData.name,
				left: '110',
				textStyle: {
					fontSize: 12,
					fontWeight: 300,
					lineHeight: 20,
					color: '#7A869A'
				}
			}],
			color: barColor,
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
				backgroundColor: 'rgba(9,30,66,0.54)',
				formatter: function (params) {
					let data = params[0],
						index = data.dataIndex;

					return `<div class="bar-tm-tooltip">
						<p class="tooltip-title mb-2">${data.name}</p>
						<p class="mb-2"> 
							<span class="key">销售额</span>
							<span class="value"> ${formatNumber(barData.sales[index])}</span></p>
						<p class="mb-2"> <span class="key">销售指标</span>
							<span class="value"> ${formatNumber(barData.salesQuotas[index])}</span></p>
						<p class="mb-2"> <span class="key">指标达成率</span>
						<span class="value"> ${formatNumber(barData.quotaAchievementes[index])}%</span></p></div>`;
				}
			},
			grid: {
				left: '24',
				right: 24,
				top: 44,
				bottom: '24',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: isEmpty(barData) ? A([]) : barData.date,
					axisTick: {
						alignWithLabel: true
					},
					axisLine: {
						lineStyle: {
							type: 'dotted',
							color: '#DFE1E6'
						}
					},
					axisLabel: {
						color: '#7A869A',
						fontSize: 14,
						lineHeight: 20,
						formatter: function (value) {
							let splitIndex = value.indexOf('年');

							if (splitIndex > 0) {
								return value.slice(0, splitIndex + 1) + '\n' + value.slice(splitIndex + 1);
							}

							return value;
						}
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#7A869A'
						// formatter: function (value) {
						// 	let result = 0;

						// 	if (value >= 1000) {
						// 		result = value / 1000 + 'k';
						// 	} else if (value < 1000) {
						// 		result = value;
						// 	}
						// 	return result;
						// }
					},
					splitLine: {
						lineStyle: {
							type: 'dotted',
							color: '#DFE1E6'
						}
					}
				}
			],
			series: isEmpty(barData) ? A([]) : [{
				name: title,
				type: 'bar',
				barWidth: '8px',
				data: barData.sales,
				itemStyle: {
					barBorderRadius: [5, 5, 0, 0]
				}
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
