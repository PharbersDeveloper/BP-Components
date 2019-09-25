import Component from '@ember/component';
import layout from '../templates/components/bp-panel';
import { isEmpty, typeOf } from '@ember/utils';
import { isArray,A } from '@ember/array';
import echarts from 'echarts';
import $ from 'jquery';
import EmberObject from '@ember/object';
import Panel from '../mixins/panel';
import { inject as service } from '@ember/service';
import { formatPhaseToStringDefault,formatPhaseToDate, confirmFormatType } from '../utils/chartFormat';

export default Component.extend(Panel, {
	layout,
	tagName: '',
	ajax: service(),
	/**
	 * @author Frank Wang
	 * @property
	 * @name queryTimes
	 * @description 请求次数，为了动态图表
	 * @type {Number}
	 * @default 0
	 * @private
	 */
	queryTimes: 0,
	/**
	 * @author Frank Wang
	 * @property
	 * @name intervalObject
	 * @description 间隔对象
	 * @type {Object}
	 * @default null
	 * @public
	 */
	intervalObject: null,
	/**
	 * @author Frank Wang
	 * @property
	 * @name queryAddress
	 * @description 数据请求的地址
	 * @type {Object}
	 * @default {}
	 * @public
	 */
	queryAddress: EmberObject.create({
		host: 'http://192.168.100.174',
		port: 9001,
		version: 'v1.0',
		db: 'DL'
	}),
	init() {
		this._super(...arguments);
		this.set('result', {});
		this.set('opts', {
			renderer: 'canvas' // canvas of svg
		});
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name onChartReady
	 * @description chaet Ready
	 * @param 该类/方法的参数，可重复定义。
	 * @return 该类/方法的返回类型。
	 * @example 创建例子。
	 * @public
	 */
	onChartReady(chart) {
		chart.showLoading({
			text: '加载中...',
			color: '#FFAB00',
			textColor: '#fff',
			maskColor: 'rgba(9,30,66,0.54)',
			zlevel: 0
		});
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name getChartIns
	 * @description 获取 chart 的实例
	 * @param 该类/方法的参数，可重复定义。
	 * @return 该类/方法的返回类型。
	 * @example 创建例子。
	 * @public
	 */
	getChartIns() {
		const selector = `#${this.get('eid')}`,
			$el = $(selector),
			echartInstance = echarts.getInstanceByDom($el[0]);

		return echartInstance;
	},

	/**
	 * @author Frank Wang
	 * @method
	 * @name generateChartOption
	 * @description 生成图表的 option
	 * @param 该类/方法的参数，可重复定义。
	 * @return {void}
	 * @example 创建例子。
	 * @private
	 */
	generateChartOption(panelConfig, condition) {
		let dynamic = condition.dynamic || null;

		// 保证在进入 setInterval 循环之前执行一次
		this.queryData(panelConfig, condition);

		this.incrementProperty('queryTimes');
		if (!isEmpty(dynamic) && dynamic.isDynamic) {
			this.set('intervalObject', setInterval(() => {
				this.incrementProperty('queryTimes');
				this.queryData(panelConfig, condition);
			}, dynamic.interval || 3000));
			return;
		}
		// this.queryData(panelConfig, condition);
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name queryData
	 * @description 发送数据请求
	 * @param config 图表的config
	 * @param condition 查询的条件
	 * @return {void}
	 * @example 创建例子。
	 * @private
	 */
	queryData(panelConfig, condition) {
		let qa = condition.queryAddress || this.get('queryAddress');

		this.get('ajax').request(`${qa.host}:${qa.port}/${qa.version}/${qa.db}`, {
			method: 'GET',
			data: JSON.stringify(condition.data),
			dataType: 'json'
		}).then(data => {
			//在这里进行数据的格式化（phase->2018Q1这种）

			let dealedData = data,
				formatType = panelConfig.xAxis&&panelConfig.xAxis.formatType,
				formatPhase2String = this.formatPeriodToString;

			if (!isEmpty(formatType)) {
				// let axisLabel = panelConfig.xAxis.axisLabel||{};

				// axisLabel.formatter = this.formatPhase.bind(this);
				dealedData = this.get(formatType)(data,condition,formatPhase2String);
				// panelConfig.xAxis.axisLabel = axisLabel;
			}

			this.updateChartData(panelConfig, dealedData);
		});
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name formatPhase
	 * @description 将queryData->queryData
	 * @param data{Array} 图表数据
	 * @return {Array}
	 * @example 创建例子。
	 * @private
	 */
	formatPhase(data,condition,formatPhase2String) {
		//  格式化整个 图表 data
		const	xAxisFormat = condition.xAxisFormat||{};

		if ( isEmpty(xAxisFormat)||isEmpty(xAxisFormat.periodBase)||isEmpty(xAxisFormat.periodStep)) {
			return data;
		}
		let titles = data[0],
			phaseIndex = titles.indexOf('phase');

		return data.map((ele,index)=> {
			let dealed = ele;

			if (index === 0) {
				return dealed;
			}
			return dealed.map((item,iindex)=> {
				if (iindex === phaseIndex) {
					let tmpDate = formatPhaseToDate(xAxisFormat.periodBase,xAxisFormat.periodStep,item);

					return formatPhase2String(tmpDate);
				}
				return item;
			});
		});
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name formatPeriodToString
	 * @description 将 date 格式化成 string 类型，进行数据展示
	 * @param date{Date}
	 * @return {String}
	 * @example 创建例子。
	 * @public
	 */
	formatPeriodToString(date) {
		// TODO 如何格式化应该是传入来的方法，如果不传入此方法，默认执行的转换格式为`yyyyQs`
		return formatPhaseToStringDefault(date);
	},
	// formatPhase(value) {
	// 只是格式化x轴
	// 	let condition = this.get('condition'),
	// 		xAxisFormat = condition.xAxisFormat||{};

	// 	if ( isEmpty(xAxisFormat)||isEmpty(xAxisFormat.periodBase)||isEmpty(xAxisFormat.periodStep)) {
	// 		return value;
	// 	}
	// 	return formatPhaseToString(xAxisFormat.periodBase,xAxisFormat.periodStep,value);
	// },
	/**
	 * @author Frank Wang
	 * @method
	 * @name updateChartData
	 * @description 更新图表数据
	 * @param config 图表的配置信息
	 * @param data 图表的数据
	 * @return {void}
	 * @example 创建例子。
	 * @private
	 */
	updateChartData(panelConfig, chartData) {
		// panelConfig.dataset = { source: chartData };

		let isLines = panelConfig.series.every((ele) => ele.type === 'line');

		if (!isLines) {
			this.reGenerateChart(panelConfig, chartData);
		} else {
			// TODO 这里可以改一下
			let linesPanelConfig = this.calculateLinesNumber(panelConfig, chartData);

			this.reGenerateChart(linesPanelConfig, chartData);
		}
		// this.reGenerateChart(panelConfig);
		this.dataReady(chartData, panelConfig);

		const echartInit = this.getChartIns();

		echartInit.hideLoading();
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name calculateLinesNumber
	 * @description 为纯折线图动态计算数目
	 * @param 该类/方法的参数，可重复定义。
	 * @return 该类/方法的返回类型。
	 * @example 创建例子。
	 * @private
	 */
	calculateLinesNumber(panelConfig, chartData) {
		let linesNumber = chartData[0].length - 1,
			lineConfig = isArray(panelConfig.series) ? panelConfig.series[0] : panelConfig.series,
			series = [...Array(linesNumber)].map(() => {
				return lineConfig;
			});

		panelConfig.series = series;
		return panelConfig;
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name reGenerateChart
	 * @description 重新生成图表
	 * @param option 配置信息
	 * @return {void}
	 * @example 创建例子。
	 * @private
	 */
	reGenerateChart(option, chartData) {
		const opts = this.get('opts'),
			echartInstance = this.getChartIns();

		// 老代码应该没有被调用，尝试删除
		// if (isEmpty(echartInstance)) {
		// 	this.set('result', option);
		// 	return;
		// }
		let condition = this.get('condition'),
			dynamic = condition.dynamic || null,
			notDynamic = isEmpty(dynamic) || !dynamic.isDynamic,
			times = this.get('queryTimes'),
			chartOption = null;

		if (isEmpty(option)) {
			echartInstance.setOption({}, opts);
			return;
		}
		if (!notDynamic) {
			chartOption = this.dynamicUpdateChart(option, chartData, times);

			times > 1 ? echartInstance.setOption({
				xAxis: {
					data: chartOption.xAxis.data
				},
				series: chartOption.series.map(ele => {
					return { data: ele.data, name: ele.name };
				})

			}) : echartInstance.setOption(chartOption);
		} else {
			echartInstance.clear();
			chartOption = this.optionWithDate(option, chartData);
			// chartOption = this.formatYAxis(chartOption);
			echartInstance.setOption(this.formatYAxis(chartOption), opts);
		}
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name optionWithDate
	 * @description 为图表的设置（option）添加 dataset
	 * @param option 图表设置
	 * @param data 图表数据
	 * @return {Object}
	 * @example 创建例子。
	 * @private
	 */
	optionWithDate(option, data) {
		option.dataset = { source: data };
		return option;
	},
	formatYAxis(option) {

		let yAxis = option.yAxis;

		if (typeOf(yAxis) === 'object') {
			option.yAxis = confirmFormatType(yAxis);
		} else if (typeOf(yAxis) === 'array') {
			let newYaxis = yAxis.map(ele => {
				return confirmFormatType(ele);
			});

			option.yAxis = newYaxis;
		}
		return option;
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name dynamicUpdateChart
	 * @description 动态更新图表后设置其axis的data以及series的data，目前只支持折线图
	 * @param option 图表设置
	 * @param data 图表数据
	 * @return {Object}
	 * @example 创建例子。
	 * @public
	 */
	dynamicUpdateChart(option, data) {
		let seriesNames = data[0].slice(1),
			datasetSource = data.slice(1),
			xAxisData = datasetSource.map(ele => ele[0]),
			series = option.series,
			newSeries = series.map((serie, i) => {
				let newItem = {},
					keys = Object.keys(serie);

				for (let j = 0, len = keys.length; j < len; j++) {
					newItem[keys[j]] = serie[keys[j]];
				}
				newItem.name = seriesNames[i];
				newItem.data = datasetSource.map(ds => ds[i + 1]);
				return newItem;
			});

		option.xAxis.data = xAxisData;
		option.series = newSeries;

		return option;
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name dataReady
	 * @description 当请求数据完毕之后，将数据抛出去
	 * @param chartData 图表数据。
	 * @param panelConfig 图表配置。
	 * @return {void}
	 * @example 创建例子。
	 * @private
	 */
	dataReady(chartData, panelConfig) {
		this.onDataReady(chartData, panelConfig);
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name onDataReady
	 * @description 当请求数据完毕之后，通过闭包将数据抛出去
	 * @param chartData 图表数据。
	 * @param panelConfig 图表配置。
	 * @return {void}
	 * @example 创建例子。
	 * @public
	 */
	onDataReady() { },
	/**
	 * ！！！永远不要使用此属性，除非你知道这个具体的作用
	 * 设计之初是没有这个属性的，只是为了解决一些排序问题。
	 * 再次申明，永远不要使用此属性
	 * @author Frank Wang
	 * @property
	 * @name outsideDealedData
	 * @description 当外部对图表数据进行格式化等一些处理操作后，使用此数据展示表格数据
	 * @type {Array}
	 * @default []
	 * @public
	*/
	outsideDealedData: A([]),
	didReceiveAttrs() {
		this._super(...arguments);
	},
	didInsertElement() {
		this._super(...arguments);
		let panelConfig = this.get('panelModel'),
			condition = this.get('condition');

		if (!isEmpty(panelConfig) && !isEmpty(condition)) {
			this.generateChartOption(panelConfig, condition);
		}
	},
	didUpdateAttrs() {
		this._super(...arguments);

		let panelConfig = this.get('panelModel'),
			condition = this.get('condition'),
			outsideDealedData = this.get('outsideDealedData');

		if (isEmpty(outsideDealedData)) {
			this.generateChartOption(panelConfig, condition);
		} else {
			const echartInit = this.getChartIns();

			echartInit.hideLoading();
			this.reGenerateChart(panelConfig, outsideDealedData);
		}
		// this.generateChartOption(panelConfig, condition);

	},
	willDestroyElement() {
		this._super(...arguments);

		let intervalObject = this.get('intervalObject');

		clearInterval(intervalObject);
	}
});
