import Component from '@ember/component';
import layout from '../templates/components/bp-line';
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
	/**
	 * legend position in init()
	 * @property legendPosition
	 * @type {object}
	 * @default {}
	 * @public
	 */
	legendPosition: '',
	generateLine() {
		let { title, subtext, lineData, lineColor, legendPosition, xAxisLine } =
			this.getProperties('title', 'subText', 'lineData', 'lineColor', 'legendPosition', 'xAxisLine'),
			legend = null;

		if (legendPosition === '') {
			legend = {
				right: '10%',
				data: lineData.map(ele => {
					return ele.name;
				})
			};
		} else {
			legend = {
				top: legendPosition.top === '' ? 'auto' : legendPosition.top,
				right: legendPosition.right === '' ? 'auto' : legendPosition.right,
				bottom: legendPosition.bottom === '' ? 'auto' : legendPosition.bottom,
				left: legendPosition.left === '' ? 'auto' : legendPosition.left,
				x: legendPosition.x === '' ? 'auto' : legendPosition.x,
				data: lineData.map(ele => {
					return ele.name;
				})
			};
		}

		return {
			title: {
				text: title,
				testStyle: {
					fontSize: 14
				},
				subtext
			},
			grid: {
				right: 0
			},
			xAxis: {
				type: 'category',
				data: lineData.get('firstObject').date,
				axisTick: {
					alignWithLabel: true
				},
				axisLine: xAxisLine,
				// axisLine: {
				// 	lineStyle: {
				// 		type: 'dotted',
				// 		color: '#DFE1E6'
				// 	}
				// },
				axisLabel: {
					color: '#7A869A'
				}
			},
			tooltip: {
				trigger: 'axis'
			},
			legend,
			color: lineColor,
			yAxis: {
				type: 'value',
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					color: '#7A869A'
				}
			},
			series: lineData.map((ele) => {
				return {
					name: ele.name,
					type: 'line',
					data: ele.data
				};
			})
		};
	},
	didInsertElement() {
		this._super(...arguments);
		let option = this.generateLine();

		this.set('result', option);
	},
	didUpdateAttrs() {
		this._super(...arguments);
		let option = this.generateLine();

		this.set('result', option);
	}
});
