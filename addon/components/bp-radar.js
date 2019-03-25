import Component from '@ember/component';
import layout from '../templates/components/bp-radar';
import { computed } from '@ember/object';

export default Component.extend({
	layout,
	classNames: ['bp-radar'],
	/**
	 * chart's title
	 * @property title
	 * @type {string}
	 * @default ''
	 * @public
	 */
	title: '',
	/**
	 * legend
	 */
	legend: computed('radarData', function () {
		let { legend, radarData } = this.getProperties('legend', 'radarData'),
			data = null;

		data = radarData.map(ele => {
			return ele.name;
		});
		legend.data = data;

		return legend;
	}),
	result: computed('title', function () {
		let title = this.get('title');
	}),
	init() {
		this._super(...arguments);
		this.set('radarData', [
			{
				value: [43, 1, 28, 35, 50],
				name: '团队本期初始能力',
				color: '#979797',
			},
			{
				value: [5, 14, 28, 31, 42],
				name: '团队平均能力',
				color: '#3172E0',

			}
		]);
		this.set('radarColor', ['#979797', '#3172E0']);
		this.set('legend', {
			left: '10%',
			bottom: '0%',
			orient: 'vertical',
			textStyle: {
				fontSize: '14px',
				color: '#344563'
			},
			data: ['团队本期初始能力', '团队平均能力']
		});
		this.set('result', {
			title: {
				text: '基础雷达图'
			},
			color: ['#979797', '#3172E0'],
			tooltip: {},
			legend: {
				left: '10%',
				bottom: '0%',
				orient: 'vertical',
				textStyle: {
					fontSize: '14px',
					color: '#344563'
				},
				data: ['团队本期初始能力', '团队平均能力']
			},
			radar: {
				name: {
					textStyle: {
						color: '#7A869A',
						borderRadius: 3,
						padding: [0, 0]
					}
				},
				indicator: [
					{ name: '产品知识', max: 100 },
					{ name: '工作积极性', max: 100 },
					{ name: '行为有效性', max: 100 },
					{ name: '区域管理能力', max: 100 },
					{ name: '销售知识', max: 100 },
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
				data: [
					{
						value: [43, 1, 28, 35, 50],
						name: '团队本期初始能力',
						areaStyle: {
							color: '#979797',
						},
					},
					{
						value: [5, 14, 28, 31, 42],
						name: '团队平均能力',
						areaStyle: {
							color: '#3172E0',
						},
					}
				]
			}]
		})
	}
});
