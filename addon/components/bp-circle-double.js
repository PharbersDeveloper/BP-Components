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
			renderer: 'svg' // canvas of svg
		});
	},
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
				{ value: 64000, name: 'rose1' },
				{ value: 20220, name: 'rose2' },
				{ value: 28331, name: 'rose3' },
				{ value: 26381, name: 'rose4' },
				{ value: 1000, name: 'rose5' },
				{ value: 37133, name: 'rose6' }
			])
		},
		{
			seriesName: '2018Q2', data: A([
				{ value: 130, name: 'rose1' },
				{ value: 541, name: 'rose2' },
				{ value: 145, name: 'rose3' },
				{ value: 253, name: 'rose4' },
				{ value: 220, name: 'rose5' },
				{ value: 355, name: 'rose6' }
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
			title = A([]),
			that = this;


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
				legendHoverLink: false,
				label: {
					normal: {
						show: false
					},
					emphasis: {
						show: false
					}
				},
				// lableLine: {
				// 	normal: {
				// 		show: false
				// 	},
				// 	emphasis: {
				// 		show: true
				// 	}
				// },
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
				// formatter: '{a} <br/>{b} : {c} ({d}%)'
				formatter: function (params) {
					let seriesIndex = params.seriesIndex,
						data = circleData[seriesIndex].data,
						onlyData = data.map(ele => ele.value),
						tooltipItems = A([]),
						tooltipItemsString = '';

					tooltipItems = data.map((ele, index) => {
						let percent = that.getPercentWithPrecision(onlyData, index);

						return `<tr class='item'>
							<td>
								<span class='point mr-2' style='background:${circleColor[index]}'></span>
								<span class='keys'>${ele.name}</span>
							</td>
							<td class='values'>${ele.value}</td>
							<td class='values'>${percent}</td>
						</tr>`;
					});
					tooltipItemsString = ''.concat(...tooltipItems);

					return `<table class="table m-0 circle-double-tooltip">
							<thead><th></th><th>销售额</th><th>占比</th></thead>	
							<tbody>${tooltipItemsString}</tbody>
						</table>`;
				},
				backgroundColor: 'rgba(9,30,66,0.54)'
			},
			color: circleColor,
			legend: {
				x: 'center',
				y: 'bottom',
				data: circleData.get('firstObject').data.map(ele => {
					return { name: ele.name, icon: 'circle' };
				})
			},
			series
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
	},

	/**
	 * 最大余额法获取百分比
	 * @param  {array} valueList 数值数组
	 * @param  {number} idx 要求的item的index
	 * @param  {number} precision 精度（2）
	 */
	getPercentWithPrecision(valueList, idx, precision = 2) {
		if (!valueList[idx]) {
			return 0;
		}

		let sum = valueList.reduce(function (acc, val) {
			return acc + (isNaN(val) ? 0 : val);
		}, 0),
			digits = Math.pow(10, precision),
			votesPerQuota = valueList.map(function (val) {
				return (isNaN(val) ? 0 : val) / sum * digits * 100;
			}),
			targetSeats = digits * 100,
			seats = votesPerQuota.map(function (votes) {
				return Math.floor(votes);
			}),
			currentSum = seats.reduce(function (acc, val) {
				return acc + val;
			}, 0),
			remainder = votesPerQuota.map(function (votes, index) {
				return votes - seats[index];
			});

		if (sum === 0) {
			return 0;
		}
		while (currentSum < targetSeats) {
			// Find next largest remainder. 找到下一个最大的余额
			let max = Number.NEGATIVE_INFINITY,
				maxId = null;

			for (let i = 0, len = remainder.length; i < len; ++i) {
				if (remainder[i] > max) {
					max = remainder[i];
					maxId = i;
				}
			}
			++seats[maxId];
			remainder[maxId] = 0;
			++currentSum;
		}

		return seats[idx] / digits;
	}
});
