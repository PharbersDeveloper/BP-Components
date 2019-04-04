import Component from '@ember/component';
import layout from '../templates/components/bp-radar';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
	layout,
	classNames: ['bp-radar'],
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
	generateRadar() {
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
			left: '30%',
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

	didInsertElement() {
		this._super(...arguments);
		let result = this.generateRadar();

		this.set('result', result);
	},
	didUpdateAttrs() {
		this._super(...arguments);
		let result = this.generateRadar();

		this.set('result', result);
	}
});
