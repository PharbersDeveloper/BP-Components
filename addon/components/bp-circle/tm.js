import Component from '@ember/component';
import layout from '../../templates/components/bp-circle/tm';
import { A } from '@ember/array';
import echarts from 'echarts';
import $ from 'jquery';
import { isEmpty } from '@ember/utils';

export default Component.extend({
	layout,
	tagName: '',
	init() {
		this._super(...arguments);
		this.set('result', {});
		this.set('opts', {
			renderer: 'svg' // canvas of svg
		});
	},
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
	 * @default ['#172B4D', '#F4F5F7']
	 * @public
	 */
	circleColor: A(['#172B4D', '#F4F5F7']),
	/**
	 * 内圆半径/外圆半径
	 * @property circleSize
	 * @type {Array}
	 * @default ['80%', '95%']
	 * @public
	 */
	circleSize: A(['80%', '95%']),
	/**
	 * @author Frank Wang
	 * @property
	 * @name labelEmphasis
	 * @description 高亮提醒
	 * @type {Boolean}
	 * @default true
	 * @public
	 */
	labelEmphasis: true,
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
		let { seriesName, circleData, circleColor, circleSize, labelEmphasis } =
			this.getProperties('seriesName', 'circleData', 'circleColor', 'circleSize', 'labelEmphasis'),
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
					radius: circleSize,
					avoidLabelOverlap: false,
					hoverOffset: 3,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: labelEmphasis,
							textStyle: {
								fontSize: '12',
								fontWeight: 'normal'
							},
							formatter: function (params) {
								return params.percent + '%';
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
