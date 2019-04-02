import Component from '@ember/component';
import layout from '../templates/components/bp-circle';
import { A } from '@ember/array';
import { equal } from '@ember/object/computed';
export default Component.extend({
	layout,
	classNames: ['bp-circle'],
	classNameBindings: ['sizeDefault', 'sizeAuto', 'sizeSmall'],
	/**
	 * widthSize
	 * @property widthSize
	 * @type {string}
	 * @default 'default'
	 * @public
	 */
	widthSize: 'default',
	/**
	 * sizeDefault
	 * @property sizeDefault
	 * @type {boolean}
	 * @default true
	 * @private
	 */
	sizeDefault: equal('widthSize', 'default'),
	sizeAuto: equal('widthSize', 'auto'),
	sizeSmall: equal('widthSize', 'small'),
	/**
	 * seriesName
	 * @property seriesName
	 * @type {string}
	 * @default ''
	 * @public
	 */
	seriesName: '',
	/**
	 * circleData
	 * @property circleData
	 * @type {Array}
	 * @default []
	 * @public
	 */
	circleData: A([
		{ value: 0, name: '已分配' },
		{ value: 1, name: '未分配' }
	]),
	/**
	 * circleColor
	 * @property circleColor
	 * @type {Array}
	 * @default ['#00875A', '#F4F5F7']
	 * @public
	 */
	circleColor: A(['#00875A', '#F4F5F7']),
	// 千分位，应该提取出去
	formatNum(number) {
		if (number.length <= 3) {
			return number;
		}
		if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(number)) {
			return number;
		}
		let a = RegExp.$1,
			b = RegExp.$2,
			c = RegExp.$3,
			re = new RegExp();

		re.compile('(\\d)(\\d{3})(,|$)');
		while (re.test(b)) {
			b = b.replace(re, '$1,$2$3');
		}
		return String(String(a) + b) + c;
	},
	generateOption() {
		let { seriesName, circleData, circleColor } =
			this.getProperties('seriesName', 'circleData', 'circleColor'),
			that = this;

		return {
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					let sName = params.seriesName,
						name = params.name,
						value = that.formatNum(params.value),
						percent = params.percent;

					return `${sName}<br/>${name}:${value}(${percent}%)`;
				},
				alwaysShowContent: false,
				hideDelay: '60'
			},
			color: circleColor,
			legend: {
				show: false
				// orient: 'vertical',
				// x: 'left',
				// data: ['已分配', '未分配']
			},
			series: [
				{
					name: seriesName,
					type: 'pie',
					radius: ['50%', '65%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: false,
							textStyle: {
								fontSize: '30',
								fontWeight: 'bold'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: circleData
				}
			]
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
	},
	init() {
		this._super(...arguments);
	}
});
