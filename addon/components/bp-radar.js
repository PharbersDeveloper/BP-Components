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
	 * final result
	 */
	result: computed('title', 'radarColor', 'radarData', function () {
		let title = this.get('title'),
			color = this.get('radarColor'),
			legendData = null,
			legend = null,
			radarData = this.get('radarData'),
			data = null;

		data = radarData.map((ele, index) => {
			return {
				value: ele.value,
				name: ele.name,
				areaStyle: {
					color: color[index]
				}
			};
		});

		legendData = radarData.map(ele => {
			return ele.name;
		});
		legend = {
			left: '0%',
			bottom: '0',
			orient: 'vertical',
			textStyle: {
				fontSize: '14px',
				color: '#344563'
			},
			data: legendData
		};
		return {
			title: {
				text: title
			},
			color,
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
	}),
	init() {
		this._super(...arguments);
		/**
		 * chart's color
		 * @property radarColor
		 * @type {Array}
		 * @default null
		 * @public
		 */
		this.set('radarColor', ['#979797', '#3172E0']);
		this.set('radarData', [
			{
				value: [0, 0, 0, 0, 0],
				name: '团队本期初始能力'
			},
			{
				value: [0, 0, 0, 0, 0],
				name: '团队平均能力'
			}
		]);
	}
});
