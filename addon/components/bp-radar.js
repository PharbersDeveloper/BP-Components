import Component from '@ember/component';
import layout from '../templates/components/bp-chart';
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
	 * chart's color
	 * @property radarColor
	 * @type {Array}
	 * @default null
	 * @public
	 */
	radarColor: A(['#979797', '#3172E0']),
	/**
	 * radar Data
	 * @property radarData
	 * @type {Array}
	 * @default
	 * @public
	 */
	radarData: A([
		{
			value: [0, 0, 0, 0, 0],
			name: '代表本期初始能力'
		},
		{
			value: [0, 0, 0, 0, 0],
			name: '团队平均能力'
		}
	]),
	/**
	 * chart's title
	 * @property title
	 * @type {string}
	 * @default ''
	 * @public
	 */
	title: '',
	/**
	 * 是否有legend
	 * @property hasLegend
	 * @type {boolean}
	 * @default true
	 * @public
	 */
	hasLegend: true,
	generateOption() {
		let { title, radarColor, hasLegend, radarData } =
			this.getProperties('title', 'radarColor', 'hasLegend', 'radarData'),
			legendData = null,
			legend = null,
			data = null;

		data = radarData.map((ele, index) => {
			return {
				value: ele.value,
				name: ele.name,
				areaStyle: {
					color: radarColor[index]
				}
			};
		});
		legendData = radarData.map(ele => {
			return { name: ele.name, icon: 'circle' };
		});
		legend = {
			show: hasLegend,
			x: 'center',
			bottom: '0',
			orient: 'vertical',
			textStyle: {
				fontSize: '14px',
				color: '#7A869A'
			},
			data: legendData
		};
		return {
			title: {
				text: title
			},
			color: radarColor,
			tooltip: {},
			legend,
			radar: {
				radius: '65%',
				name: {
					textStyle: {
						color: '#7A869A',
						borderRadius: 3,
						padding: [0, 0]
					}
				},
				indicator: [

					{ name: '工作积极性', max: 100 },
					{ name: '产品知识', max: 100 },
					{ name: '行为有效性', max: 100 },
					{ name: '区域管理能力', max: 100 },
					{ name: '销售知识', max: 100 }
				],
				splitNumber: 5, //default
				axisLine: {
					lineStyle: {
						color: '#DFE1E6'
					}
				},
				splitLine: {
					lineStyle: {
						color: '#DFE1E6'
					}
				},
				splitArea: {
					areaStyle: {
						color: ['#fff', '#fff']
					}
				}
			},
			series: [{
				name: '',
				type: 'radar',
				data
			}]
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
