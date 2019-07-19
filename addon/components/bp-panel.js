import Component from '@ember/component';
import layout from '../templates/components/bp-panel';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import echarts from 'echarts';
import $ from 'jquery';
import Panel from '../mixins/panel';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { generateXaxis, generateYaxis, generateTooltip, generateLegend } from '../utils/generateChartPart';

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
	generateChartTitle() {

	},
	generateBar() {
		let { chartData, chartColor } =
			this.getProperties('chartData', 'chartColor'),
			xAxisData = isEmpty(chartData) ? A([]) : chartData.get('firstObject').date,
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
			xAxisData = isEmpty(chartData) ? A([]) : chartData.get('firstObject').date,
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

		new Promise(function (resolve) {

			later(function () {
				let data = A([]);

				if (panelModel.id === 1) {
					data = A([{
						name: 'dataA',
						date: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度'],
						data: [0.320, 0.332, 0.301, 0.334]
					},
					{
						name: 'DataB',
						date: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度'],
						data: [0.820, 0.932, 0.901, 0.934]
					},
					{
						name: 'DataC',
						date: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度'],
						data: [0.420, 0.555, 0.509, 0.364]
					},
					{
						name: 'DataD',
						date: ['2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度'],
						data: [0.470, 0.439, 0.117, 0.769]
					}]);

				}
				resolve(data);
			}, 2400);
		}).then(data => {
			this.set('chartData', data);
			that.didUpdateAttrs();
			return this.get('ajax').request('http://192.168.100.157:9200/aggregatedata/_search', {
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
	},

	didInsertElement() {
		this._super(...arguments);
		let option = this.generateChartOption();

		this.reGenerateChart(this, option);
		// this.set('result', option);
	},
	didUpdateAttrs() {
		this._super(...arguments);
		let option = this.generateChartOption();

		this.reGenerateChart(this, option);
	},
	willDestroyElement() {
		this._super(...arguments);
		const selector = `#${this.get('eid')}`,
			$el = $(selector),
			echartInstance = echarts.getInstanceByDom($el[0]);

		echartInstance.clear();
	}
});
