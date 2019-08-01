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
		host: 'http://192.168.100.157',
		port: 9000,
		sheet: 'tmchart',
		rule: 'format'
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
	generateChartOption(panelConfig, condition) {
		let dynamic = condition.dynamic || null;

		if (!isEmpty(dynamic) && dynamic.isDynamic) {
			this.interval = setInterval(() => {
				this.queryData(panelConfig, condition);
			}, dynamic.interval || 3000);
			return;
		}
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
		let qa = condition.queryAddress || this.get('queryAddress');

		this.get('ajax').request(`${qa.host}:${qa.port}/${qa.sheet}/${qa.rule}`, {
			method: 'GET',
			data: JSON.stringify(condition.data),
			dataType: 'json'
		}).then(data => {
			// 针对雷达等特殊图表需要进一步格式化
			this.updataChartData(data, panelConfig);
		});
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
			this.generateChartOption(panelConfig, condition);
		}
	},
	didUpdateAttrs() {
		this._super(...arguments);
		let panelConfig = this.get('panelModel'),
			condition = this.get('condition');

		this.generateChartOption(panelConfig, condition);

	},
	willDestroyElement() {
		this._super(...arguments);
		window.console.log('willDestroyElement');
		// const echartInit = this.getChartIns();

		// echartInit.clear();
		// echartInit.dispose();

	}
});
