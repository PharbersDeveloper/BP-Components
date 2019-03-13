import Component from '@ember/component';
import layout from '../templates/components/bp-bar';
import { A } from '@ember/array';
import { computed } from '@ember/object';

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
	 * @default []
	 * @public
	 */
	barColor: A([]),
	result: computed('title', 'subText', 'barData', function () {
		let barData = this.get('barData').sort((a, b) => {
				return b.value - a.value;
			}),
			colorList = barData.map(ele => {
				if (ele.type === 'MNC') {
					return '#0070c0';
				} else if (ele.type === 'Local') {
					return '#c4bd97';
				}
				return '#ff0000';

			});

		return {
			color: ['#0070c0', '#c4bd97', '#ff0000'],
			title: {
				text: this.get('title'),
				subtext: this.get('subText')
			},
			xAxis: {
				type: 'category',
				data: barData.map(ele => {
					return ele.prodName;
				}),
				axisLabel: {
					interval: 0,
					rotate: 40
				}
			},
			yAxis: {},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				orient: 'vertical',
				y: 'center',
				right: '10%',
				data: ['MNC', 'Local', 'Lilly'],
				selectedMode: false,
				tooltip: {
					show: false
				}
			},
			series: [{
				name: '',
				barWidth: '70%',
				type: 'bar',
				itemStyle: {
					normal: {
						color: function (params) {
							return colorList[params.dataIndex];
						}
					}
				},
				data: barData.map(ele => {
					return ele.value;
				})
			},
			{
				name: 'MNC',
				type: 'bar',
				stack: '',
				barWidth: 0,
				data: 0
			},
			{
				name: 'Local',
				type: 'bar',
				stack: '',
				barWidth: 0,
				data: 0
			},
			{
				name: 'Lilly',
				type: 'bar',
				stack: '',
				barWidth: 0,
				data: 0
			}]
		};
	})
});
