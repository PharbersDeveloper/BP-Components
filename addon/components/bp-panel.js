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
		maskColor: 'rgba(194, 88, 86, 0.3)',
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
		// chart.hideLoading();
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
	generateChartOption() {
		let panelConfig = this.get('panelModel');

		this.queryData(panelConfig);
	},
	queryData(panelConfig) {

		const that = this;

		let condition = JSON.stringify(panelConfig.condition) || '';

		this.get('ajax').request('http://192.168.100.157:9000/tmchart/format', {

			method: 'GET',
			data: condition,
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
		// 			// ['product', '2018年第一季度', '2018年第二季度', '2018年第三季度', '2018年第四季度', '2019年第一季度'],
		// 			// ['prodA', 0.320, 0.332, 0.301, 0.334, 0.3],
		// 			// ['prodB', 0.20, 0.32, 0.11, 0.4, 0.21],
		// 			// ['prodC', 0.420, 0.555, 0.509, 0.364, 0.5],
		// 			// ['prodD', 0.470, 0.439, 0.117, 0.769, 0.11]
		// 			// tmProductCircle0/tmProductCircle1
		// 			// ['product', 'sales', 'date', 'rate'],
		// 			// ['优派西', 13348195, '2018Q1', 0.0608],
		// 			// ['威芃可', 22892408, '2018Q1', 0.1042],
		// 			// ['开拓来', 183382110, '2018Q1', 0.835]
		// 			// tmProductBarLine0
		// 			// ['date', 'sales', 'target', 'targetRate', 'product'],
		// 			// ['2018Q1', 3906599868, 3645895565, 0.420, 'all'],
		// 			// ['2018Q2', 3906599868, 2327034368, 0.555, 'all'],
		// 			// ['2018Q3', 3606157067, 2434094442, 0.509, 'all'],
		// 			// ['2018Q4', 492470928, 2831556342, 0.364, 'all'],
		// 			// ['2019Q1', 3058116944, 2921291388, 0.5, 'all']
		// 			// tmRegionCircle0/tmRegionCircle1
		// 			// ['region', 'sales', 'date', 'rate'],
		// 			// ['会南市', 13348195, '2018Q1', 0.0608],
		// 			// ['会西市', 22892408, '2018Q1', 0.1042],
		// 			// ['会东市', 183382110, '2018Q1', 0.835]
		// 			// tmRegionBarLine0
		// 			// ['date', 'sales', 'target', 'targetRate', 'product', 'region'],
		// 			// ['2018Q1', 3906599868, 3645895565, 0.420, 'all', 'all'],
		// 			// ['2018Q2', 3906599868, 2327034368, 0.555, 'all', 'all'],
		// 			// ['2018Q3', 3606157067, 2434094442, 0.509, 'all', 'all'],
		// 			// ['2018Q4', 492470928, 2831556342, 0.364, 'all', 'all'],
		// 			// ['2019Q1', 3058116944, 2921291388, 0.5, 'all', 'all']
		// 			// tmRepresentativeCircle0/tmRepresentativeCircle1
		// 			// ['representative', 'sales', 'date', 'rate'],
		// 			// ['clockq', 13348195, '2018Q1', 0.0608],
		// 			// ['谢广坤', 22892408, '2018Q1', 0.1042],
		// 			// ['赵四', 183382110, '2018Q1', 0.35],
		// 			// ['刘能', 133382110, '2018Q1', 0.635],
		// 			// ['段坤', 153382110, '2018Q1', 0.435],
		// 			// ['邦古', 113382110, '2018Q1', 0.135]
		// 			// tmRepresentativeBarLine0
		// 			// ['date', 'sales', 'target', 'targetRate', 'product', 'representative'],
		// 			// ['2018Q1', 3906599868, 3645895565, 0.420, 'all', 'clockq'],
		// 			// ['2018Q2', 3906599868, 2327034368, 0.555, 'all', 'clockq'],
		// 			// ['2018Q3', 3606157067, 2434094442, 0.509, 'all', 'clockq'],
		// 			// ['2018Q4', 492470928, 2831556342, 0.364, 'all', 'clockq'],
		// 			// ['2019Q1', 3058116944, 2921291388, 0.5, 'all', 'clockq']
		// 			// tmHospitalCircle0/tmHospitalCircle1
		// 			['hospitalLevel', 'sales', 'date', 'rate'],
		// 			['一级', 13348195, '2018Q1', 0.0608],
		// 			['二级', 22892408, '2018Q1', 0.1042],
		// 			['三级', 183382110, '2018Q1', 0.35],
		// 			['院外', 133382110, '2018Q1', 0.635]
		// 			// tmHospitalBarLine0
		// 			// ['date', 'sales', 'target', 'targetRate', 'product', 'hospital'],
		// 			// ['2018Q1', 3906599868, 3645895565, 0.420, 'all', '北京协和医院'],
		// 			// ['2018Q2', 3906599868, 2327034368, 0.555, 'all', '北京协和医院'],
		// 			// ['2018Q3', 3606157067, 2434094442, 0.509, 'all', '北京协和医院'],
		// 			// ['2018Q4', 492470928, 2831556342, 0.364, 'all', '北京协和医院'],
		// 			// ['2019Q1', 3058116944, 2921291388, 0.5, 'all', '北京协和医院']
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
		const selector = `#${this.get('eid')}`,
			$el = $(selector),
			opts = this.get('opts'),
			echartInit = echarts.init($el[0], opts);

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

		this.generateChartOption();
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
