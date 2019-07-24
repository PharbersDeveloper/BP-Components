import Component from '@ember/component';
import layout from '../templates/components/bp-panel';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import echarts from 'echarts';
import $ from 'jquery';
import EmberObject from '@ember/object';
import Panel from '../mixins/panel';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { generateXaxis, generateYaxis, generateTooltip, generateLegend, generateRadar } from '../utils/generateChartPart';

export default Component.extend(Panel, {
	layout,
	tagName: '',
	ajax: service(),
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
	chartColor: A(['#73ABFF', '#2355A9', '#FFC400', '#5799ff']),
	/**
	 * @author Frank Wang
	 * @property
	 * @name chartData
	 * @description chart's data
	 * @type {Array}
	 * @default A([])
	 * @public
	 */
	chartData: A([]),
	/**
	 * @author Frank Wang
	 * @property
	 * @name loadingOptions
	 * @description 加载中的效果
	 * @type {Object}
	 * @default {}
	 * @public
	 */
	loadingOptions: EmberObject.extend({
		text: '加载中...',
		color: '#4413c2',
		textColor: '#270240',
		maskColor: 'rgba(255, 255, 255, 0.3)',
		zlevel: 0
	}),
	/**
	 * @author Frank Wang
	 * @method
	 * @name onChartReady
	 * @description 当 chart 完成
	 * @param 该类/方法的参数，可重复定义。
	 * @return 该类/方法的返回类型。
	 * @example 创建例子。
	 * @public
	 */
	onChartReady(chart) {
		console.log('onChartReady-----');
		chart.hideLoading();
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name
	 * @description
	 * @param 该类/方法的参数，可重复定义。
	 * @return 该类/方法的返回类型。
	 * @example 创建例子。
	 * @public
	 */
	afterSetup(context, chart) {
		console.log('afterSetup!!!!!');
	},
	reGenerateChart(self, option) {
		const selector = `#${this.get('eid')}`,
			$el = $(selector),
			opts = this.get('opts'),
			// echartInit = echarts.init($el[0], opts),
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
	generateChartTitle() {

	},
	generateBar() {
		let { chartData, chartColor } =
			this.getProperties('chartData', 'chartColor'),
			xAxisData = isEmpty(chartData) ? A([]) : chartData.get('firstObject').xValue,
			xAxisConfig = this.get('xaxis'),
			yAxisConfig = this.get('yaxis'),
			tooltipConfig = this.get('tooltip'),
			legendConfig = this.get('legend'),
			xAxis = generateXaxis(xAxisConfig, xAxisData),
			yAxis = generateYaxis(yAxisConfig),
			tooltip = generateTooltip(tooltipConfig),
			legend = generateLegend(legendConfig),
			series = A([]);

		if (isEmpty(chartData)) {
			series = A([]);
		}
		series = chartData.map(ele => {
			return {
				name: ele.name,
				type: 'bar',
				barWidth: '8px',
				data: ele.data,
				itemStyle: {
					barBorderRadius: [5, 5, 0, 0]
				}
			};
		});

		return {
			/**
			 *
			 title: [{
			 	text: title,
			 	fontWeight: 500,
			 	textStyle: {
			 		fontSize: 14,
			 		color: '#172B4D'
			 	}
			 }, {
			 	text: barData.name,
			 	left: '110',
			 	textStyle: {
			 		fontSize: 12,
			 		fontWeight: 300,
			 		lineHeight: 20,
			 		color: '#7A869A'
			 	}
			 }],
			*/
			color: chartColor,
			tooltip,
			grid: {
				left: '24',
				right: 24,
				top: 44,
				bottom: '24',
				containLabel: true
			},
			xAxis,
			yAxis,
			legend,
			series
		};
	},
	generateLine() {
		let { chartData, chartColor } =
			this.getProperties('chartData', 'chartColor'),
			xAxisData = isEmpty(chartData) ? A([]) : chartData.get('firstObject').xValue,
			xAxisConfig = this.get('xaxis'),
			yAxisConfig = this.get('yaxis'),
			tooltipConfig = this.get('tooltip'),
			legendConfig = this.get('legend'),
			xAxis = generateXaxis(xAxisConfig, xAxisData),
			yAxis = generateYaxis(yAxisConfig),
			tooltip = generateTooltip(tooltipConfig),
			legend = generateLegend(legendConfig);

		return {
			/** title: [{
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
			}],
			*/
			grid: {
				left: 48,
				// top:16,
				right: 48
			},
			xAxis,
			tooltip,
			legend,
			color: chartColor,
			yAxis,
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
		let { chartData, chartColor, pieConfigs } =
			this.getProperties('chartData', 'chartColor', 'pieConfigs'),
			tooltipConfig = this.get('tooltip'),
			legendConfig = this.get('legend'),
			tooltip = generateTooltip(tooltipConfig),
			legend = generateLegend(legendConfig);

		return {
			tooltip,
			color: chartColor,
			legend,
			series: chartData.map((ele, index) => {
				let pieConfig = pieConfigs[index];

				return {
					name: ele.name || '',
					type: 'pie',
					radius: A([pieConfig.insideRadius || '80%', pieConfig.outsideRadius || '95%']),
					avoidLabelOverlap: pieConfig.avoidLabelOverlap || false,
					hoverOffset: pieConfig.hoverOffset || 3,
					label: {
						normal: pieConfig.label.normal || {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: pieConfig.label.emphasis.show || false,
							textStyle: {
								fontSize: '14',
								fontWeight: 'normal'
							},
							formatter: function (params) {
								return params.percent + '%';
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: !ele.xValue ? [] : ele.xValue.map((item, i) => {
						return {
							name: item,
							value: ele.data[i]
						};
					})
				};
			})
			// series: [
			// 	{
			// 		name: 'seriesName',
			// 		type: 'pie',
			// 		radius: A(['80%', '95%']),
			// 		avoidLabelOverlap: false,
			// 		hoverOffset: 3,
			// 		label: {
			// 			normal: {
			// 				show: false,
			// 				position: 'center'
			// 			},
			// 			emphasis: {
			// 				show: true,
			// 				textStyle: {
			// 					fontSize: '14',
			// 					fontWeight: 'normal'
			// 				},
			// 				formatter: function (params) {
			// 					return params.percent + '%';
			// 				}
			// 			}
			// 		},
			// 		labelLine: {
			// 			normal: {
			// 				show: false
			// 			}
			// 		},
			// 		data: chartData
			// 	}
			// ]
		};
	},
	generateRadar() {
		let { chartData, chartColor } =
			this.getProperties('chartData', 'chartColor'),
			radarConfig = this.get('radarConfig'),
			tooltipConfig = this.get('tooltip'),
			legendConfig = this.get('legend'),
			tooltip = generateTooltip(tooltipConfig),
			legend = generateLegend(legendConfig),
			indicator = chartData.get('firstObject') ? chartData.get('firstObject').xValue.map(ele => {
				return { name: ele, max: 1 };
			}) : [],
			radar = generateRadar(radarConfig, indicator);

		return {
			grid: {
				left: 'center'
			},
			color: chartColor,
			tooltip,
			legend,
			radar,
			series: [{
				name: '',
				type: 'radar',
				data: chartData.map((ele, index) => {
					return {
						value: ele.data,
						name: ele.name,
						areaStyle: {
							color: chartColor[index]
						}
					};
				})
			}]
		};
	},
	generateStack() {
		window.console.log('Stack');
	},
	generateScatter() {
		window.console.log('generateScatter');
	},
	generateChartOption() {
		let panelConfig = this.get('panelModel');

		this.queryData(panelConfig);
	},
	queryData(panelConfig) {

		const that = this;

		this.get('ajax').request('http://192.168.100.157:9000/data', {
			method: 'GET'
			// contentType: 'application/json; charset=UTF-8',
			// data: {}
		}).then(data => {
			that.updataChartData(data, panelConfig);

		});

		// new Promise(function (resolve) {
		// 	later(function () {
		// 		let data = A([
		// 			['product', '2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度', '2019年第一季度'],
		// 			['dataA', 0.320, 0.332, 0.301, 0.334, 0.3],
		// 			['prodB', 0.20, 0.32, 0.11, 0.4, 0.21],
		// 			['prodC', 0.420, 0.555, 0.509, 0.364, 0.5],
		// 			['prodD', 0.470, 0.439, 0.117, 0.769, 0.11]
		// 		]);

		// 		resolve(data);
		// 	}, 2400);
		// 	//	 伪代码，有请求之后就删除掉
		// }).then(data => {
		// 	that.updataChartData(data, panelConfig);
		// });
	},
	updataChartData(chartData, panelConfig) {
		panelConfig.dataset = { source: chartData };
		this.reGenerateChart(this, panelConfig);
		const selector = `#${this.get('eid')}`,
			$el = $(selector),
			opts = this.get('opts'),
			echartInit = echarts.init($el[0], opts);

		echartInit.hideLoading();
	},
	didReceiveAttrs() {
		this._super(...arguments);

		let panelModel = this.get('panelModel'),
			keys = Object.keys(panelModel),
			that = this;

		for (let i = 0, len = keys.length; i < len; i++) {
			let key = keys[i];

			this.set(key, panelModel[key]);
		}
		/*
		new Promise(function (resolve) {

			later(function () {
				let data = A([]);
				// 伪代码，有请求之后就删除掉

				if (panelModel.line || panelModel.radar) {
					data = A([{
						name: 'dataA',
						xValue: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度', '2019年第一季度'],
						data: [0.320, 0.332, 0.301, 0.334, 0.3]
					},
					{
						name: 'DataB',
						xValue: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度', '2019年第一季度'],
						data: [0.20, 0.32, 0.11, 0.4, 0.21]
					},
					{
						name: 'DataC',
						xValue: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度', '2019年第一季度'],
						data: [0.420, 0.555, 0.509, 0.364, 0.5]
					},
					{
						name: 'DataD',
						xValue: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度', '2019年第一季度'],
						data: [0.470, 0.439, 0.117, 0.769, 0.11]
					}]);

				} else if (panelModel.pie) {
					data = A([{
						name: 'dataA',
						xValue: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度', '2019年第一季度'],
						data: [0.320, 0.332, 0.301, 0.334, 0.3]
					}]);
				}
				resolve(data);
			}, 2400);
			//	 伪代码，有请求之后就删除掉
		}).then(data => {
			this.set('chartData', data);
			that.didUpdateAttrs();
			return this.get('ajax').request('http://192.168.100.157:9000/data', {
				method: 'POST',
				contentType: 'application/json; charset=UTF-8',
				data: {
					'query': {
						'bool': {
							'must': [],
							'must_not': [],
							'should': [{ 'match_all': {} }]
						}
					},
					'from': 0,
					// 'form':this.get('time').from,
					// 'to':this.get('tiem').to,
					'size': 5,
					'sort': [], 'aggs': {}, 'version': true
				}
			});
		}).then(data => {
			let originData = data.hits.hits.map(ele => {
					return ele['_source'];
				}),
				xAxisData = originData.map(ele => ele.city),
				yAxisData = originData.map(ele => Number(ele.value));

			if (panelModel.bar) {
				this.set('chartData', A([{ name: 'share', date: xAxisData, data: yAxisData }]));
				that.didUpdateAttrs();
			}

		});
		*/
	},
	didInsertElement() {
		this._super(...arguments);

		this.generateChartOption();
	},
	didUpdateAttrs() {
		this._super(...arguments);
		this.generateChartOption();

		// let option = this.generateChartOption();

		// this.reGenerateChart(this, option);

	},
	willDestroyElement() {
		this._super(...arguments);
		const selector = `#${this.get('eid')}`,
			$el = $(selector),
			echartInstance = echarts.getInstanceByDom($el[0]);

		echartInstance.clear();
	}
});
