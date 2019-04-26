import Component from '@ember/component';
import layout from '../templates/components/bp-circle-double';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';
export default Component.extend({
	layout,
	classNames: ['chart-container'],
	/**
	 * circleData
	 * @property circleData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	circleData: A([
		{
			seriesName: '2018Q1', data: A([
				{ value: 10, name: 'rose1' },
				{ value: 51, name: 'rose2' },
				{ value: 15, name: 'rose3' },
				{ value: 25, name: 'rose4' },
				{ value: 20, name: 'rose5' },
				{ value: 35, name: 'rose6' },
				{ value: 30, name: 'rose7' },
				{ value: 40, name: 'rose8' }
			])
		},
		{
			seriesName: '2018Q2', data: A([
				{ value: 130, name: 'rose1' },
				{ value: 541, name: 'rose2' },
				{ value: 145, name: 'rose3' },
				{ value: 253, name: 'rose4' },
				{ value: 220, name: 'rose5' },
				{ value: 355, name: 'rose6' },
				{ value: 302, name: 'rose7' },
				{ value: 410, name: 'rose8' }
			])
		}
	]),
	/**
	 * circleColor
	 * @property circleColor
	 * @type {Array}
	 * @default ['#79e2f2', '#c0b6f2', '#79f1c0', '#fabdad', '#74aafb', '#FFE380']
	 * @public
	 */
	circleColor: A(['#79e2f2', '#c0b6f2', '#79f1c0', '#fabdad', '#74aafb', '#FFE380']),
	/**
	 * circle size 内圆心的半径与外圆的半径
	 * @property circleSize
	 * @type {Array}
	 * @default [60, 90]
	 * @public
	 */
	circleSize: A([60, 90]),
	generateOption() {
		let { circleData, circleColor, circleSize } =
			this.getProperties('circleData', 'circleColor', 'circleSize'),
			series = A([]),
			title = A([]);


		if (isEmpty(circleData)) {
			return;
		}
		series = circleData.map((ele, index) => {
			let centerX = 25 + index * 50 + '%';

			return {
				name: ele.seriesName,
				type: 'pie',
				radius: circleSize,
				center: [centerX, '50%'],
				legendHoverLink: true,
				label: {
					normal: {
						show: false
					},
					emphasis: {
						show: true
					}
				},
				lableLine: {
					normal: {
						show: false
					},
					emphasis: {
						show: true
					}
				},
				data: ele.data
			};
		});
		title = circleData.map((ele, index) => {
			let xPosition = index * 50 + '%';

			return {
				text: ele.seriesName,
				x: xPosition,
				top: 16,
				textStyle: {
					color: '#172B4D',
					fontWeight: 400,
					fontSize: 14
				},
				textVerticalAlign: 'middle'
			};
		});

		return {
			title,
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			color: circleColor,
			legend: {
				x: 'center',
				y: 'bottom'
			},
			series
		};
	},
	didInsertElement() {
		this._super(...arguments);
		let option = this.generateOption();

		this.set('result', option);

	},
	didUpdateAttrs() {
		this._super(...arguments);
		let option = this.generateOption();

		this.set('result', option);
	}
});
