import Component from '@ember/component';
import layout from '../templates/components/bp-bar';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Component.extend({
	layout,
	classNames: ['bp-bar'],
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
	barData: A([]),
	/**
	 * bar Color
	 * @property barColor
	 * @type {Array}
	 * @default  ['#3398DB']
	 * @public
	 */
	barColor: A(['#3398DB']),
	generateBar() {
		let { title, barColor, barData } =
			this.getProperties('title', 'barColor', 'barData');

		// originalBarData = this.get('barData') || A([]),
		// barData = originalBarData.sort((a, b) => {
		// 	return b.value - a.value;
		// });

		return {
			color: barColor,
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: isEmpty(barData) ? [] : barData.map(ele => ele.prodName),
					axisTick: {
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
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLabel: {
						color: '#7A869A'
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
			legend: {
				name: [title]
			},
			series: [
				{
					name: [title],
					type: 'bar',
					barWidth: 40,
					itemStyle: {
						normal: {
							color: '#579AFF',
							barBorderRadius: 4
						}
					},
					data: isEmpty(barData) ? [] : barData.map(ele => ele.value)
				}
			]
		};
	},
	didInsertElement() {
		this._super(...arguments);
		let option = this.generateBar();

		this.set('result', option);
	},
	didUpdateAttrs() {
		this._super(...arguments);
		let option = this.generateBar();

		this.set('result', option);
	}
});
