import Component from '@ember/component';
import layout from '../templates/components/bp-line';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
	layout,
	classNames: ['bp-line'],
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
	 * @property lineData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	lineData: A([]),
	/**
	 * line Color
	 * @property lineColor
	 * @type {Array}
	 * @default []
	 * @public
	 */
	lineColor: A([]),
	generateLine() {

	},
	result: computed('title', 'subText', 'lineData', function () {
		let lineData = this.get('lineData');

		return {
			title: {
				text: this.get('title'),
				testStyle: {
					fontSize: 14
				},
				subtext: this.get('subText')
			},
			xAxis: {
				type: 'category',
				data: lineData.firstObject.date,
				axisTick: {
					alignWithLabel: true
				}
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				right: '10%',
				data: lineData.map(ele => {
					return ele.name;
				})
			},
			color: this.get('lineColor'),
			yAxis: {
				type: 'value'
			},
			series: lineData.map((ele) => {
				return {
					name: ele.name,
					type: 'line',
					data: ele.data
				};
			})
		};
	})
});
