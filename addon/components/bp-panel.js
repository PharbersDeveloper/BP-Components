import Component from '@ember/component';
import layout from '../templates/components/bp-panel';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import echarts from 'echarts';
import $ from 'jquery';
import Panel from '../mixins/panel';

export default Component.extend(Panel, {
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
	 * xAxisData
	 * @property xAxisData
	 * @type {string}
	 * @default ''
	 * @public
	 */
	xAxisData: A(['city1', 'city2', 'city3', 'city4', 'city5', 'city6']),
	/**
	 * chartColor
	 * @property chartColor
	 * @type {Array}
	 * @default ['#172B4D', '#F4F5F7']
	 * @public
	 */
	chartColor: A(['#73ABFF', '#2355A9', '#FFC400']),
	/**
	 * @author Frank Wang
	 * @property
	 * @name chartData
	 * @description chart's data
	 * @type {Array}
	 * @default A([])
	 * @public
	 */
	chartData: A([{
		name: 'dataA',
		date: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度'],
		data: [320, 332, 301, 334]
	},
	{
		name: 'DataB',
		date: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度'],
		data: [820, 932, 901, 934]
	},
	{
		name: 'DataC',
		date: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度'],
		data: [420, 555, 509, 364]
	},
	{
		name: 'DataD',
		date: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度'],
		data: [470, 439, 117, 769]
	}]),
	generateOption() {
		let { chartData, chartColor, xAxisData } =
			this.getProperties('chartData', 'chartColor', 'xAxisData'),
			yAxisBarMax = 0,
			yAxisLineMax = 0,
			totalBarData = A([]),
			totalchartData = A([]);


		if (isEmpty(chartData)) {
			return {};
		}
		totalBarData = chartData.map(ele => {
			if (ele.type === 'bar') {
				return ele.data;
			}
		}).reduce((result, ele) => result.concat(ele), []).filter(Boolean);

		totalchartData = chartData.map(ele => {
			if (ele.type !== 'bar') {
				return ele.data;
			}
		}).reduce((result, ele) => result.concat(ele), []).filter(Boolean);

		yAxisBarMax = Math.floor(Math.max(...totalBarData) * 5 / 4);

		yAxisLineMax = Math.floor(Math.max(...totalchartData) * 5 / 4);

		return {
			color: chartColor,
			backgroundColor: 'white',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					}
				}
			},
			toolbox: {
				show: false,
				feature: {
					dataView: { show: true, readOnly: false },
					magicType: { show: true, type: ['line', 'bar'] },
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			grid: {
				right: 200
			},
			legend: [{
				type: 'scroll',
				orient: 'vertical',
				itemWidth: 8,
				itemHeight: 8,
				right: 24,
				y: 50,
				padding: 5,
				itemGap: 15,
				icon: 'circle',
				textStyle: {
					//图例文字的样式
					color: '#7A869A',
					fontSize: 14
				},
				data: chartData.map(ele => {
					if (ele.type === 'bar') {
						return ele.name;
					}
					return false;
				}).filter(Boolean)
			},
			{
				type: 'scroll',
				orient: 'vertical',
				itemWidth: 16,
				itemHeight: 4,
				right: 24,
				y: 110,
				padding: 5,
				itemGap: 15,
				icon: 'rect',
				textStyle: {
					//图例文字的样式
					color: '#7A869A',
					fontSize: 14
				},
				data: chartData.map(ele => {
					if (ele.type !== 'bar') {
						return ele.name;
					}
					return false;
				}).filter(Boolean)
			}],
			xAxis: [
				{
					type: 'category',
					data: xAxisData,
					axisPointer: {
						type: 'shadow'
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
				}
			],
			yAxis: [
				{
					type: 'value',
					min: 0,
					max: yAxisLineMax,
					// splitNumber: 8,
					// interval: yAxisLeftinterval,
					splitLine: {
						lineStyle: {
							type: 'dotted'
						}
					},
					axisLabel: {
						formatter: '{value} %',
						color: '#7A869A'
					},
					axisLine: {
						show: false,
						lineStyle: {
							type: 'solid',
							color: '#DFE1E6'
						}
					}
				},
				{
					type: 'value',
					min: 0,
					max: yAxisBarMax,
					// splitNumber: 8,
					// interval: yAxisRightinterval,
					splitLine: {
						lineStyle: {
							type: 'dotted'
						}
					},
					axisLabel: {
						color: '#7A869A'
					},
					axisLine: {
						show: false,
						lineStyle: {
							type: 'solid',
							color: '#DFE1E6'
						}
					}
				}
			],
			series: chartData.map((ele) => {
				return {
					name: ele.name,
					type: ele.type,
					barGap: 0,
					yAxisIndex: ele.yAxisIndex,
					barWidth: 8,
					data: ele.data,
					itemStyle: {
						normal: {
							lineStyle: {
								width: 2,
								type: 'dotted'
							}
						}
					}
				};
			})
		};
	},
	reGenerateChart(self, option) {
		const selector = `#${this.get('eid')}`,
			$el = $(selector),
			opts = this.get('opts'),
			echartInstance = echarts.getInstanceByDom($el[0]);

		console.log(echartInstance);
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
	generateChartTitle() {

	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name generateXasix
	 * @description 用于生成x坐标轴
	 * @param 该类/方法的参数，可重复定义。
	 * @return {Object}
	 * @example 创建例子。
	 * @private
	 */
	generateXaxis(chartData, xAxisConfig, valueFormatCallback) {
		return {
			type: 'category',
			data: isEmpty(chartData) ? A([]) : chartData.get('firstObject').date,
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
					return isEmpty(valueFormatCallback) ? value : valueFormatCallback(value);
				}
			}
		};
	},
	generateBar() {
		window.console.log('bar');
	},
	generateLine(xaxis) {
		window.console.log('Line');
		let { chartData, chartColor, legendPosition, unitYaxis } =
			this.getProperties('chartData', 'chartColor', 'legendPosition', 'unitYaxis'),
			legend = null,
			xAxis = this.generateXaxis(chartData, xaxis);

		if (isEmpty(legendPosition)) {
			legend = {
				// top: '38px',
				// left: 'center',
				x: 'center',
				y: 'top',
				textStyle: {
					fontSize: 14,
					color: '#7A869A'
				},
				data: isEmpty(chartData) ? A([]) : chartData.map(ele => {
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
				data: isEmpty(chartData) ? A([]) : chartData.map(ele => {
					return ele.name;
				})
			};
		}

		return {
			// title: [{
			// 	text: title,
			// 	textStyle: {
			// 		fontSize: 14,
			// 		color: '#172B4D'
			// 	}
			// }, {
			// 	text: subText,
			// 	left: '120',
			// 	textStyle: {
			// 		fontSize: 12,
			// 		fontWeight: 300,
			// 		lineHeight: 20,
			// 		color: '#7A869A'
			// 	}
			// }],

			grid: {
				left: 48,
				// top:16,
				right: 48
			},
			xAxis,
			tooltip: {
				trigger: 'axis',
				formatter: function (params) {
					let items = params.map(ele => {
						let percent = Number((ele.data * 100).toFixed(1));

						return `<p class="line-tm-item my-1">
							<span class='mr-2'>${ele.marker}${ele.seriesName}</span>
							<span>${percent}%</span>
							</p>`;
					}),
						stringItems = '';

					items.forEach(ele => {
						stringItems += ele;
					});

					return `<p class="my-1">${params[0].axisValue}</p>
						${stringItems}`;
				}
			},
			legend,
			color: chartColor,
			yAxis: {
				type: 'value',
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					color: '#7A869A',
					formatter: function (value) {
						return value * 100 + unitYaxis;
					}
				},
				splitLine: {
					lineStyle: {
						type: 'dotted',
						color: '#DFE1E6'
					}
				}
			},
			series: isEmpty(chartData) ? A([]) : chartData.map((ele) => {
				return {
					name: ele.name,
					type: 'line',
					data: ele.data
				};
			})
		};
	},
	generatePie() {
		window.console.log('Pie');
	},
	generateStack() {
		window.console.log('Stack');
	},
	generateScatter() {
		window.console.log('generateScatter');
	},
	generateChartOption() {
		let panelConfig = this.get('panelModel');

		switch (true) {
			case panelConfig.bar:
				return this.generateBar();
			case panelConfig.line:
				return this.generateLine(panelConfig.xaxis);
			case panelConfig.pie:
				return this.generatePie();
			case panelConfig.stack:
				return this.generateStack();
			case panelConfig.scatter:
				return this.generateScatter();
			default:
				break;
		}
		window.console.log(panelConfig);

	},
	// didReceiveAttrs() {
	// 	this._super(...arguments);
	// 	window.console.log(this.get('panelModel'));
	// },

	didInsertElement() {
		this._super(...arguments);
		console.log('didInsertElement');
		// let option = this.generateOption();
		let option = this.generateChartOption();

		console.log(option);
		this.reGenerateChart(this, option);
		// this.set('result', option);
	},
	didUpdateAttrs() {
		this._super(...arguments);
		console.log('didUpdateAttrs');
		let option = this.generateOption();

		this.reGenerateChart(this, option);
	},
	willDestroyElement() {
		this._super(...arguments);
		window.console.log('willDestroyElement');
		const selector = `#${this.get('eid')}`,
			$el = $(selector),
			echartInstance = echarts.getInstanceByDom($el[0]);

		console.log(echartInstance);
		echartInstance.clear();
	}
});
