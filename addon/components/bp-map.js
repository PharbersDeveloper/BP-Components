import Component from '@ember/component';
import layout from '../templates/components/bp-chart';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import echarts from 'echarts';
// import china from 'china';
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
	 * title
	 * @property title
	 * @type {string}
	 * @default ''
	 * @public
	 */
	title: '',
	/**
	 * maxValue
	 * @property maxValue
	 * @type {number}
	 * @default 100
	 * @public
	 */
	maxValue: 100,

	/**
	 * chartData
	 * @property chartData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	chartData: A([{
		name: '江苏省',
		value: 5.3
	}, {
		name: '北京市',
		value: 3.8
	}, {
		name: '上海',
		value: 4.6
	}, {
		name: '重庆',
		value: 3.6
	}, {
		name: '河北',
		value: 3.4
	}, {
		name: '河南',
		value: 3.2
	}, {
		name: '云南',
		value: 1.6
	}, {
		name: '辽宁',
		value: 4.3
	}, {
		name: '黑龙江',
		value: 4.1
	}, {
		name: '湖南',
		value: 2.4
	}, {
		name: '安徽',
		value: 3.3
	}, {
		name: '山东',
		value: 3.0
	}, {
		name: '新疆',
		value: 1
	}, {
		name: '江苏',
		value: 3.9
	}, {
		name: '浙江',
		value: 3.5
	}, {
		name: '江西',
		value: 2.0
	}, {
		name: '湖北',
		value: 2.1
	}, {
		name: '广西',
		value: 3.0
	}, {
		name: '甘肃',
		value: 1.2
	}, {
		name: '山西',
		value: 3.2
	}, {
		name: '内蒙古',
		value: 3.5
	}, {
		name: '陕西',
		value: 2.5
	}, {
		name: '吉林',
		value: 4.5
	}, {
		name: '福建',
		value: 2.8
	}, {
		name: '贵州',
		value: 80
	}, {
		name: '广东',
		value: 100
	}, {
		name: '青海',
		value: 43
	}, {
		name: '西藏',
		value: 33
	}, {
		name: '四川',
		value: 3.3
	}, {
		name: '宁夏',
		value: 0.8
	}, {
		name: '海南',
		value: 1.9
	}, {
		name: '台湾',
		value: 0.1
	}, {
		name: '香港',
		value: 50
	}, {
		name: '澳门',
		value: 88
	}
	]),
	/**
	 * chartColor
	 * @property chartColor
	 * @type {Array}
	 * @default ['#172B4D', '#F4F5F7']
	 * @public
	 */
	chartColor: A(['#4C9AFF', '#FFE380']),

	generateOption() {
		let { chartData, maxValue } =
			this.getProperties('chartData', 'maxValue');

		return {
			backgroundColor: 'white',
			// hover框
			tooltip: {
				show: true,
				formatter: function (params) {
					return params.name + '：' + params.data['value'] + '%';
				}
			},
			visualMap: {
				// type: 'continuous',
				orient: 'horizontal',
				itemWidth: 10,
				itemHeight: 80,
				text: [maxValue, 0],
				showLabel: true,
				seriesIndex: [0],
				min: 0,
				max: maxValue,
				inRange: {
					color: ['#deebff', '#b3d4ff', '#3483ff', '#2b72da', '#1e46a6']
				},
				textStyle: {
					color: '#7A869A'
				},
				bottom: 30,
				left: 'center'
			},
			xAxis: {
				show: false
			},
			yAxis: {
				axisLine: {
					show: false
				}
			},
			geo: {
				map: 'china',
				left: 'center',
				top: 'center'

			},
			series: [{
				name: 'china',
				type: 'map',
				roam: false,
				geoIndex: 0,
				label: {
					show: false
				},
				data: chartData
			}]
		};
	},
	reGenerateChart(self, option) {
		const selector = `#${this.get('eid')}`,
			$el = $(selector),
			opts = this.get('opts'),
			echartInstance = echarts.getInstanceByDom($el[0]);

		// eslint-disable-next-line no-undef
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
