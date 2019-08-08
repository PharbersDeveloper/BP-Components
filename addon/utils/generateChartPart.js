import { isEmpty } from '@ember/utils';

/**
 * @author Frank Wang
 * @method
 * @name generateXaxis
 * @description 用于生成x坐标轴
 * @param axisConfig x轴坐标的配置数据
 * @param xAxisData x轴坐标的显示数据
 * @param valueFormatCallback 显示的值的格式化回调
 * @return {Object}
 * @example 创建例子。
 * @private
 */
export function generateXaxis(axisConfig, xAxisData, valueFormatCallback) {
	return {
		show: axisConfig.show || true,
		type: axisConfig.type || 'category',
		name: axisConfig.name || '',
		data: xAxisData,
		axisTick: {
			show: axisConfig.axisTickShow || true,
			alignWithLabel: true
		},
		axisLine: {
			show: axisConfig.axisLineShow || true,
			lineStyle: {
				type: 'dotted',
				color: '#DFE1E6'
			}
		},
		axisLabel: {
			show: axisConfig.axisLabelShow || true,
			color: '#7A869A',
			fontSize: 14,
			lineHeight: 20,
			formatter: function (value) {
				return isEmpty(valueFormatCallback) ? value : valueFormatCallback(value);
			}
		}
	};
}
/**
 * @author Frank Wang
 * @method
 * @name generateYaxis
 * @description 用于生成 y 坐标轴
 * @param axisConfig x轴坐标的配置数据
 * @param valueFormatCallback 显示的值的格式化回调
 * @return {Object}
 * @example 创建例子。
 * @private
 */
export function generateYaxis(axisConfig, valueFormatCallback) {

	return {
		show: axisConfig.show,
		type: axisConfig.type,
		axisLine: {
			show: axisConfig.axisLineShow
		},
		axisTick: {
			show: axisConfig.axisTickShow
		},
		axisLabel: {
			show: axisConfig.axisLabelShow,
			color: '#7A869A',
			formatter: function (value) {
				return isEmpty(valueFormatCallback) ? value : valueFormatCallback(value);
			}
			// formatter: function (value) {
			// 	return value * 100 + axisConfig.unit;
			// }
		},
		splitLine: {
			show: true,
			lineStyle: {
				type: 'dotted',
				color: '#DFE1E6'
			}
		}
	};
}
/**
 * @author Frank Wang
 * @method
 * @name generateTooltip
 * @description 用于生成 tooltip
 * @param config tooltip的配置信息
 * @return {Object}
 * @example 创建例子。
 * @public
 */
export function generateTooltip(config) {
	return {
		show: config.show,
		trigger: config.trigger || 'axis',
		axisPointer: { // 坐标轴指示器，坐标轴触发有效
			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
		},
		backgroundColor: 'rgba(9,30,66,0.54)'
		// formatter: function (params) {
		// 	let items = params.map(ele => {
		// 			let percent = Number((ele.data * 100).toFixed(1));

		// 			return `<p class="line-tm-item my-1">
		// 			<span class='mr-2'>${ele.marker}${ele.seriesName}</span>
		// 			<span>${percent}%</span>
		// 			</p>`;
		// 		}),
		// 		stringItems = '';

		// 	items.forEach(ele => {
		// 		stringItems += ele;
		// 	});

		// 	return `<p class="my-1">${params[0].axisValue}</p>
		// 		${stringItems}`;
		// }
	};
}
/**
 * @author Frank Wang
 * @method
 * @name generateLegend
 * @description 用于生成 legend
 * @param config legend 的配置参数
 * @return {Object}
 * @example 创建例子。
 * @public
 */
export function generateLegend(config) {
	return {
		show: config.show,
		x: config.x || 'center',
		y: config.y || 'bottom',
		orient: config.orient || 'horizontal',
		textStyle: {
			fontSize: 14,
			color: '#7A869A'
		}
	};
}
/**
 * @author Frank Wang
 * @method
 * @name generateRadar
 * @description 用于生成 Radar Chart
 * @param config radar 的配置参数
 * @return {Object}
 * @example 创建例子。
 * @public
 */
export function generateRadar(config, indicator) {
	return {
		radius: config.radius || '65%',
		name: {
			textStyle: {
				color: '#7A869A',
				borderRadius: 3,
				padding: [0, 0]
			}
		},
		indicator,
		splitNumber: config.splitNumber || 5, //default
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
	};
}
export function generateChartTitle() {

}
export function generateBar() {
	let { chartData, chartColor } =
		this.getProperties('chartData', 'chartColor'),
		xAxisData = isEmpty(chartData) ? A([]) : chartData.get('firstObject').xValue,
		xAxisConfig = this.get('xaxis'),
		yAxisConfig = this.get('yaxis'),
		tooltipConfig = this.get('tooltip'),
		legendConfig = this.get('legend'),
		xAxis = generateXaxis(xAxisConfig, xAxisData),
		yAxis = generateYaxis(yAxisConfig),
		tooltip = generateTooltip(tooltipConfig),
		legend = generateLegend(legendConfig),
		series = A([]);

	if (isEmpty(chartData)) {
		series = A([]);
	}
	series = chartData.map(ele => {
		return {
			name: ele.name,
			type: 'bar',
			barWidth: '8px',
			data: ele.data,
			itemStyle: {
				barBorderRadius: [5, 5, 0, 0]
			}
		};
	});

	return {
		/**
		 *
		 title: [{
			 text: title,
			 fontWeight: 500,
			 textStyle: {
				 fontSize: 14,
				 color: '#172B4D'
			 }
		 }, {
			 text: barData.name,
			 left: '110',
			 textStyle: {
				 fontSize: 12,
				 fontWeight: 300,
				 lineHeight: 20,
				 color: '#7A869A'
			 }
		 }],
		*/
		color: chartColor,
		tooltip,
		grid: {
			left: '24',
			right: 24,
			top: 44,
			bottom: '24',
			containLabel: true
		},
		xAxis,
		yAxis,
		legend,
		series
	};
}
export function generateLine() {
	let { chartData, chartColor } =
		this.getProperties('chartData', 'chartColor'),
		xAxisData = isEmpty(chartData) ? A([]) : chartData.get('firstObject').xValue,
		xAxisConfig = this.get('xaxis'),
		yAxisConfig = this.get('yaxis'),
		tooltipConfig = this.get('tooltip'),
		legendConfig = this.get('legend'),
		xAxis = generateXaxis(xAxisConfig, xAxisData),
		yAxis = generateYaxis(yAxisConfig),
		tooltip = generateTooltip(tooltipConfig),
		legend = generateLegend(legendConfig);

	return {
		/** title: [{
		// 	text: title,
		// 	textStyle: {
		// 		fontSize: 14,
		// 		color: '#172B4D'
		// 	}
		// }, {
		// 	text: subText,
		// 	left: '120',
		// 	textStyle: {
		// 		fontSize: 12,
		// 		fontWeight: 300,
		// 		lineHeight: 20,
		// 		color: '#7A869A'
		// 	}
		}],
		*/
		grid: {
			left: 48,
			// top:16,
			right: 48
		},
		xAxis,
		tooltip,
		legend,
		color: chartColor,
		yAxis,
		series: isEmpty(chartData) ? A([]) : chartData.map((ele) => {
			return {
				name: ele.name,
				type: 'line',
				data: ele.data
			};
		})
	};
}
export function generatePie() {
	window.console.log('Pie');
	let { chartData, chartColor, pieConfigs } =
		this.getProperties('chartData', 'chartColor', 'pieConfigs'),
		tooltipConfig = this.get('tooltip'),
		legendConfig = this.get('legend'),
		tooltip = generateTooltip(tooltipConfig),
		legend = generateLegend(legendConfig);

	return {
		tooltip,
		color: chartColor,
		legend,
		series: chartData.map((ele, index) => {
			let pieConfig = pieConfigs[index];

			return {
				name: ele.name || '',
				type: 'pie',
				radius: A([pieConfig.insideRadius || '80%', pieConfig.outsideRadius || '95%']),
				avoidLabelOverlap: pieConfig.avoidLabelOverlap || false,
				hoverOffset: pieConfig.hoverOffset || 3,
				label: {
					normal: pieConfig.label.normal || {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: pieConfig.label.emphasis.show || false,
						textStyle: {
							fontSize: '14',
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
				data: !ele.xValue ? [] : ele.xValue.map((item, i) => {
					return {
						name: item,
						value: ele.data[i]
					};
				})
			};
		})
		// series: [
		// 	{
		// 		name: 'seriesName',
		// 		type: 'pie',
		// 		radius: A(['80%', '95%']),
		// 		avoidLabelOverlap: false,
		// 		hoverOffset: 3,
		// 		label: {
		// 			normal: {
		// 				show: false,
		// 				position: 'center'
		// 			},
		// 			emphasis: {
		// 				show: true,
		// 				textStyle: {
		// 					fontSize: '14',
		// 					fontWeight: 'normal'
		// 				},
		// 				formatter: function (params) {
		// 					return params.percent + '%';
		// 				}
		// 			}
		// 		},
		// 		labelLine: {
		// 			normal: {
		// 				show: false
		// 			}
		// 		},
		// 		data: chartData
		// 	}
		// ]
	};
}
export function generateRadarTotal() {
	let { chartData, chartColor } =
		this.getProperties('chartData', 'chartColor'),
		radarConfig = this.get('radarConfig'),
		tooltipConfig = this.get('tooltip'),
		legendConfig = this.get('legend'),
		tooltip = generateTooltip(tooltipConfig),
		legend = generateLegend(legendConfig),
		indicator = chartData.get('firstObject') ? chartData.get('firstObject').xValue.map(ele => {
			return { name: ele, max: 1 };
		}) : [],
		radar = generateRadar(radarConfig, indicator);

	return {
		grid: {
			left: 'center'
		},
		color: chartColor,
		tooltip,
		legend,
		radar,
		series: [{
			name: '',
			type: 'radar',
			data: chartData.map((ele, index) => {
				return {
					value: ele.data,
					name: ele.name,
					areaStyle: {
						color: chartColor[index]
					}
				};
			})
		}]
	};
}
export function generateStack() {
	window.console.log('Stack');
}
export function generateScatter() {
	window.console.log('generateScatter');
}
