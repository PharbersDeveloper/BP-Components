import BpLine from 'bp-components/components/bp-line';
import layout from '../../templates/components/bp-line/tm';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';

export default BpLine.extend({
	layout,
	classNames: ['bp-line-tm'],
	generateLine() {
		let { title, subText, lineData, lineColor, legendPosition } =
			this.getProperties('title', 'subText', 'lineData', 'lineColor', 'legendPosition'),
			legend = null;

		if (isEmpty(legendPosition)) {
			legend = {
				top: '38px',
				left: 'center',
				textStyle: {
					fontSize: 14,
					color: '#7A869A'
				},
				data: isEmpty(lineData) ? A([]) : lineData.map(ele => {
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
				data: isEmpty(lineData) ? A([]) : lineData.map(ele => {
					return ele.name;
				})
			};
		}

		return {
			title: [{
				text: title,
				textStyle: {
					fontSize: 14,
					color: '#172B4D'
				}
			}, {
				text: subText,
				left: '120',
				textStyle: {
					fontSize: 12,
					fontWeight: 300,
					lineHeight: 20,
					color: '#7A869A'
				}
			}],

			grid: {
				left: 48,
				top: 82,
				right: 48
			},
			xAxis: {
				type: 'category',
				data: isEmpty(lineData) ? A([]) : lineData.get('firstObject').date,
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
				},
				splitLine: {
					lineStyle: {
						type: 'dotted',
						color: '#DFE1E6'
					}
				}
			},
			series: isEmpty(lineData) ? A([]) : lineData.map((ele) => {
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
		this.set('result', this.generateLine());
	},

	didUpdateAttrs() {
		this._super(...arguments);
		let option = this.generateLine();

		this.set('result', option);
	}
	// beforeSetup(context, chart) {

	// },
	// afterSetup(context, chart) {

	// }
});
