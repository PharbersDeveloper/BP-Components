import Component from '@ember/component';
import layout from '../templates/components/bp-pie';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Component.extend({
	layout,
	classNames: ['bp-pie'],
	/**
	 * pie chart's title
	 * @property title
	 * @type {string}
	 * @default ''
	 * @public
	 */
	title: '',
	/**
	 * pie chart's subtext
	 * @property subText
	 * @type {string}
	 * @default ''
	 * @public
	 */
	subText: '',
	/**
	 * pie Data
	 * @property pieData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	pieData: A([]),
	/**
	 * pie Color
	 * @property pieColor
	 * @type {Array}
	 * @default []
	 * @public
	 */
	pieColor: A([]),
	result: computed('title', 'subText', 'pieData', function () {
		let pieData = this.get('pieData');

		return {
			color: ['#4f81bd', '#dc853e', '#93a9ce', '#d09493', '#b8cd97',
				'#a99bbd', '#92c3d5', '#4672a8', '#ab4744', '#8aa64f'],
			title: {
				text: this.get('title')
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			// legend: {
			// 	orient: 'vertical',
			// 	y: 'center',
			// 	right: '10%',
			// 	data: ['MNC', 'Local', 'Lilly'],
			// 	selectedMode: false,
			// 	tooltip: {
			// 		show: false
			// 	}
			// },
			series: [
				{
					name: 'Profile',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: pieData,
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
	})
});
