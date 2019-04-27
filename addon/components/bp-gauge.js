import Component from '@ember/component';
import layout from '../templates/components/bp-gauge';

export default Component.extend({
	layout,
	classNames: ['bp-gauge'],
	init() {
		this._super(...arguments);
		this.set('result', {});
	},
	seriesName: '',
	value: 180,
	maxValue: 360,
	generateGauge() {
		let { seriesName, value, maxValue } =
			this.getProperties('seriesName', 'value', 'maxValue'),
			splitPosition = (value / maxValue).toFixed(1);

		return {
			grid: {
				left: 0,
				top: 0,
				right: 0,
				bottom: 0
			},
			series: [
				{
					name: seriesName,
					type: 'gauge',
					startAngle: 180,
					endAngle: 0,
					radius: '100%',
					// center: ['50%', '60%'],
					splitNumber: 2,
					axisLine: {
						show: false,
						lineStyle: {
							width: 8,
							color: [[splitPosition, '#3172E0'], [1, '#F4F5F7']]
						}
					},
					axisTick: { show: false },
					axisLabel: { show: false },
					splitLine: { show: false },
					pointer: {
						show: true,
						width: '2%',
						length: '100%'
					},
					itemStyle: {
						opacity: 0
					},
					detail: {
						show: false,
						color: '#fff'
					}
				}
			]
		};
	},
	didInsertElement() {
		this._super(...arguments);
		let result = this.generateGauge();

		this.set('result', result);
	},
	didUpdateAttrs() {
		this._super(...arguments);
		let result = this.generateGauge();

		this.set('result', result);
	}
});
