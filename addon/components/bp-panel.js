import Component from '@ember/component';
import layout from '../templates/components/bp-panel';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import echarts from 'echarts';
import $ from 'jquery';
import EmberObject from '@ember/object';
import { later } from '@ember/runloop';
import Panel from '../mixins/panel';
import { inject as service } from '@ember/service';

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
	reGenerateChart(self, option) {
		const opts = this.get('opts'),
			echartInstance = this.getChartIns();

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
	generateChartOption() {
		let panelConfig = this.get('panelModel'),
			condition = this.get('condition');

		this.queryData(panelConfig, condition);
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

		const that = this;

		this.get('ajax').request('http://192.168.100.157:9000/tmchart/format', {

			method: 'GET',
			data: JSON.stringify(condition),
			dataType: 'json'
			// contentType: 'application/json; charset=UTF-8'
		}).then(data => {
			// 针对雷达等特殊图表需要进一步格式化
			that.updataChartData(data, panelConfig);
		});
		//	 伪代码，有请求之后就删除掉
		// new Promise(function (resolve) {
		// 	later(function () {
		// 		let data = A([
		// 			// tmRepresentativeBarLine0
		// 			// ['date', 'sales', 'target', 'targetRate', 'product', 'representative'],
		// 			// ['2018Q1', 3906599868, 3645895565, 0.420, 'all', 'clockq'],
		// 			// ['2018Q2', 3906599868, 2327034368, 0.555, 'all', 'clockq'],
		// 			// ['2018Q3', 3606157067, 2434094442, 0.509, 'all', 'clockq'],
		// 			// ['2018Q4', 492470928, 2831556342, 0.364, 'all', 'clockq'],
		// 			// ['2019Q1', 3058116944, 2921291388, 0.5, 'all', 'clockq']
		// 		]);
		// 		resolve(data);
		// 	}, 2400);
		// }).then(data => {
		// 	that.updataChartData(data, panelConfig);
		// });
		//	 伪代码，有请求之后就删除掉
	},
	updataChartData(chartData, panelConfig) {
		panelConfig.dataset = { source: chartData };
		this.reGenerateChart(this, panelConfig);
		this.dataReady(chartData, panelConfig);

		const echartInit = this.getChartIns();

		echartInit.hideLoading();
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
	didReceiveAttrs() {
		this._super(...arguments);
	},
	didInsertElement() {
		this._super(...arguments);
		let panelConfig = this.get('panelModel'),
			condition = this.get('condition');

		if (!isEmpty(panelConfig) && !isEmpty(condition)) {
			this.generateChartOption();
		}
	},
	didUpdateAttrs() {
		this._super(...arguments);
		this.generateChartOption();
	},
	willDestroyElement() {
		// this._super(...arguments);
		// const selector = `#${this.get('eid')}`,
		// 	$el = $(selector),
		// 	echartInstance = echarts.getInstanceByDom($el[0]);

		// echartInstance.clear();
	}
});
