import Component from '@ember/component';
import layout from '../../templates/components/bp-bar/maxbi';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { formatNumber } from '../../helpers/format-number';

export default Component.extend({
	layout,
	classNames: ['bp-bar-max'],
	init() {
		this._super(...arguments);
		this.set('result', {});
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
	 * @default ['#579AFF']
	 * @public
	 */
	barColor: A(['#579AFF']),

	generateBarTm() {
		let { title, subText, barData, barColor } =
			this.getProperties('title', 'subText', 'barData', 'barColor');

		return {
			title: [{
				text: title,
				fontWeight: 500,
				textStyle: {
					fontSize: 14,
					color: '#172B4D'
				}
			}, {
				text: subText,
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
				backgroundColor: 'rgba(9,30,66,0.54)'
				// formatter: function (params) {
				// 	let data = params[0],
				// 		index = data.dataIndex;

				// 	return `<div class="bar-tm-tooltip">
				// 		<p class="tooltip-title mb-2">${data.name}</p>
				// 		<p class="mb-2">
				// 			<span class="key">销售额</span>
				// 			<span class="value"> ${formatNumber(barData.sales[index])}</span></p>
				// 		<p class="mb-2"> <span class="key">销售指标</span>
				// 			<span class="value"> ${formatNumber(barData.salesQuotas[index])}</span></p>
				// 		<p class="mb-2"> <span class="key">指标达成率</span>
				// 		<span class="value"> ${formatNumber(barData.quotaAchievementes[index])}%</span></p></div>`;
				// }
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
					data: isEmpty(barData) ? A([]) : barData.map(ele => ele.prodName),
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
						lineHeight: 20
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
	didInsertElement() {
		this._super(...arguments);
		let option = this.generateBarTm();

		this.set('result', option);
	},
	didUpdateAttrs() {
		this._super(...arguments);
		let option = this.generateBarTm();

		this.set('result', option);
	}
});
