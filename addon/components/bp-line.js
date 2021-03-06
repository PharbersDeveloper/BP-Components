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
	lineColor: A(['#79E2F2', '#FFE380', '#8777D9 ', '#579AFF', '#36B37E']),
	/**
	 * legend position in init()
	 * @property legendPosition
	 * @type {object}
	 * @default {}
	 * @public
	 */
	legendPosition: '',
	generateLine() {
		let { title, subText, lineData, lineColor, legendPosition, xAxisLine } =
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
				subtext: subText
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			legend,
			color: lineColor,
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				type: 'category',
				splitLine: {
					show: false,
					lineStyle: {
						color: ['#DFE1E6'],
						width: 2,
						type: '#DFE1E6'
					}
				},
				axisLabel: {
					color: '#7A869A'
				},
				axisLine: {
					lineStyle: {
						type: 'dashed',
						color: '#DFE1E6'
					}
				},
				boundaryGap: false,
				data: lineData.get('firstObject') ? lineData.get('firstObject').date : []
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					color: '#7A869A'
				},
				axisLine: {
					lineStyle: {
						type: 'solid',
						color: 'transparent'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: ['#D2D4D9'],
						width: 1,
						type: 'dashed'
					}
				}
			},
			series: lineData.map((ele) => {
				return {
					name: ele.name,
					type: 'line',
					data: ele.data,
					symbolSize: 6,//拐点大小
					itemStyle: {
						normal: {
							lineStyle: {
								width: 4//设置线条粗细
							}
						}
					}
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
