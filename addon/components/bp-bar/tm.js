import Component from '@ember/component';
import layout from '../../templates/components/bp-bar/tm';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';

export default Component.extend({
	layout,
	classNames: ['bp-bar-tm'],
	/**
	 * line chart's title
	 * @property title
	 * @type {string}
	 * @default ''
	 * @public
	 */
	title: '',
	/**
	 * line chart's subtext
	 * @property subText
	 * @type {string}
	 * @default ''
	 * @public
	 */
	subText: '',
	/**
	 * line Data
	 * @property barData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	// barData: A([]),
	barData: A([]),
	/**
	 * line Color
	 * @property barColor
	 * @type {Array}
	 * @default ['#505F79']
	 * @public
	 */
	barColor: A(['#505F79']),

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
				backgroundColor: 'rgba(9,30,66,0.54)',
				formatter: function (params) {
					let data = params[0],
						index = data.dataIndex;

					return `<div class="bar-tm-tooltip">
						<p class="tooltip-title mb-2">${data.name}</p>
						<p class="mb-2"> 
							<span class="key">销售额</span>
							<span class="value"> ${barData[0].sales[index]}</span></p>
						<p class="mb-2"> <span class="key">销售指标</span>
							<span class="value"> ${barData[0].targets[index]}</span></p>
						<p class="mb-2"> <span class="key">指标达成率</span>
						<span class="value"> ${barData[0].rates[index]}</span></p></div>`;
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
					data: isEmpty(barData) ? A([]) : barData.get('firstObject').date,
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
					},
					splitLine: {
						lineStyle: {
							type: 'dotted',
							color: '#DFE1E6'
						}
					}
				}
			],
			series: isEmpty(barData) ? A([]) : barData.map((ele) => {
				return {
					name: title,
					type: 'bar',
					barWidth: '8px',
					data: ele.sales,
					itemStyle: {
						barBorderRadius: [5, 5, 0, 0]
					}
				};
			})
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
