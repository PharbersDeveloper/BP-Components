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