import Component from '@ember/component';
import layout from '../templates/components/bp-chart';
import { formatNumber } from '../helpers/format-number';
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
	 * seriesName
	 * @property seriesName
	 * @type {string}
	 * @default ''
	 * @public
	 */
	seriesName: '',
	/**
	 * chartData
	 * @property chartData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	chartData: A([]),
	// chartData: A([
	// 	{
	// 		name: '销售额',
	// 		date: ['2018Q1', '2018Q2', '2018Q3', '2018Q4', '2019Q1', '2019Q2', '2019Q3', '2019Q4'],
	// 		data: [782.0, 874.9, 787.0, 23.2, 25.6, 4135.6, 162.2, 4160],
	// 		yAxisIndex: 1
	// 	},
	// 	{
	// 		name: '指标',
	// 		date: ['2018Q1', '2018Q2', '2018Q3', '2018Q4', '2019Q1', '2019Q2', '2019Q3', '2019Q4'],
	// 		data: [3983, 3407, 2432, 965, 1177, 20.0, 263.4, 334.3],
	// 		yAxisIndex: 1
	// 	},
	// 	{
	// 		name: '指标达成率',
	// 		date: ['2018Q1', '2018Q2', '2018Q3', '2018Q4', '2019Q1', '2019Q2', '2019Q3', '2019Q4'],
	// 		data: [45.0, 52.2, 20.3, 34.4, 23.0, 12.5, 22.0, 6.2],
	// 		yAxisIndex: 0
	// 	}
	// ]),
	/**
	 * chartColor
	 * @property chartColor
	 * @type {Array}
	 * @default ['#505F79 ', '#97A0AF','#00C7E6']
	 * @public
	 */
	chartColor: A(['#579AFF ', '#C2DAFF', '#FFAB00']),
	/**
	 * 自定义 tooltip
	 * @property selfTooltip
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	selfTooltip: false,
	/**
	 * 数值的单位
	 * @property numberUnit
	 * @type {String}
	 * @default '''
	 * @public
	 */
	numberUnit: '',
	/**
	 * 率的单位
	 * @property rateUnit
	 * @type {String}
	 * @default '''
	 * @public
	 */
	rateUnit: '',
	generateOption() {
		let { chartData, chartColor, selfTooltip, rateUnit, numberUnit } =
			this.getProperties('chartData', 'chartColor', 'selfTooltip', 'rateUnit', 'numberUnit'),
			series = A([]),
			yAxisRightMax = A([]),
			yAxisLeftMax = A([]),
			tooltip = null;

		if (isEmpty(chartData)) {
			return;
		}
		series = chartData.map(ele => {
			if (ele.yAxisIndex === 1) {
				yAxisRightMax.push(...ele.data);
				return {
					name: ele.name,
					type: 'bar',
					yAxisIndex: 0,
					barWidth: '12px',
					data: ele.data,
					itemStyle: {
						barBorderRadius: [0, 0, 0, 0]
					}
				};
			}
			yAxisLeftMax.push(...ele.data);

			return {
				name: ele.name,
				type: 'line',
				// areaStyle: {
				// 	normal: {
				// 		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				// 			offset: 0,
				// 			color: '#00C7E6'
				// 		}, {
				// 			offset: 1,
				// 			color: '#fff'
				// 		}])
				// 	}
				// },
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'top',
							formatter: function (params) {
								return `${params.value} ${rateUnit}`;
							}
						}
					}
				},
				yAxisIndex: 1,
				data: ele.data
			};
		});
		// yAxisRightMax = Math.floor(Math.max(...yAxisRightMax) * 5 / 4);
		// yAxisLeftMax = Math.floor(Math.max(...yAxisLeftMax) * 5 / 4);
		if (!selfTooltip) {
			tooltip = {
				trigger: 'axis'
			};
		} else {
			tooltip = {
				trigger: 'axis',
				backgroundColor: 'rgba(9,30,66,0.54)',
				formatter: function (params) {
					let data = params[0],
						stringData = '';

					params.forEach(ele => {
						let item = `<p class='tooltip-item mt-2 mb-0'>
							<span>
							${ele.marker}
							<span class="key">${ele.seriesName}</span>
							</span>
							<span class="value">${ele.seriesType === 'line' ? ele.value + rateUnit : numberUnit + formatNumber(ele.value)}</span>
						</p>`;

						stringData += item;
					});
					return `<div class="bar-tm-tooltip">
						<p class="tooltip-title">${data.name}</p>
						${stringData}
						</div>`;
				}
			};
		}
		return {
			grid: {
				top: 24,
				right: 42
			},
			tooltip,
			color: chartColor,
			legend: {
				x: 'center',
				y: 'bottom',
				data: chartData.map(ele => {
					return { name: ele.name, icon: 'circle' };
				}),
				textStyle: {
					fontSize: 14,
					color: '#7A869A'
				}
			},
			xAxis: [
				{
					type: 'category',
					data: chartData.get('firstObject').date,
					axisTick: {
						show: false,
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
					},
					nameGap: 24,
					nameTextStyle: {
						fontSize: 14,
						padding: 12
					},
					axisPointer: {
						lineStyle: {
							type: 'dashed',
							color: '#EBECF0'
						}
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					show: true,
					// name: '水量',
					min: 0,
					// max: yAxisRightMax,
					// interval: 50,
					axisLabel: {
						color: '#7A869A',
						formatter: function (value) {
							let formatValue = formatNumber(value);

							return `${numberUnit}${formatValue}`;
						}
					},
					axisTick: {
						show: false,
						alignWithLabel: true
					},
					axisLine: {
						show: false,
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
				},
				{
					type: 'value',
					name: '',
					min: 0,
					// max: yAxisLeftMax,
					// interval: 6,
					axisTick: {
						show: false,
						alignWithLabel: true
					},
					axisLabel: {
						color: '#7A869A',
						formatter: `{value}${rateUnit}`
					},
					axisLine: {
						show: false,
						type: 'solid',
						lineStyle: {
							type: 'solid',
							color: '#EBECF0'
						}
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: '#D2D4D9',
							width: 1,
							type: 'dashed'
						}
					}
				}
			],
			series
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
