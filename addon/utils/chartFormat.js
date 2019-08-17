import { isEmpty } from '@ember/utils';

/**
 * @author Frank Wang
 * @method
 * @name formatNumber
 * @description 针对数值添加千分位
 * @param number
 * @return {String}
 * @example 创建例子。
 * @public
 */
export function formatNumber(number) {
	if (number.length <= 3) {
		return number;
	}
	if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(number)) {
		return number;
	}
	let a = RegExp.$1,
		b = RegExp.$2,
		c = RegExp.$3,
		reg = new RegExp();

	reg.compile('(\\d)(\\d{3})(,|$)');
	while (reg.test(b)) {
		b = b.replace(reg, '$1,$2$3');
	}
	return String(String(a) + b) + c;
}
/**
 * @author Frank Wang
 * @method
 * @name formatRateAxis
 * @description 为比率坐标轴数值格式化百分数+%
 * @param value 小数
 * @return {String}
 * @example 创建例子。
 * @public
 */
export function formatRateAxis(value) {
	if (typeof value === 'number') {
		return value * 100 + '%';
	}
	return value;
}
/**
 * @author Frank Wang
 * @method
 * @name confirmFormatType
 * @description 确认y轴格式化的类型
 * @param yAxis y轴的配置对象
 * @return {Object}
 * @example 创建例子。
 * @public
 */
export function confirmFormatType(yAxis) {
	if (yAxis.axisLabel.formatType === 'formatRate') {
		yAxis.axisLabel.formatter = formatRateAxis;
	}
	return yAxis;
}
/**
 * @author Frank Wang
 * @method
 * @name formatPhase
 * @description 对后端传入的phase进行格式化
 * @param OriginBasePhase{String} string/timestamp
 * @param step{string} 间隔时间（以 'M'/'Y'结尾）
 * @param phase{number} 要format的周期,number 类型（-1，1...这种）
 * @return {Array}
 * @example 创建例子。
 * @public
 */
export function formatPhase(OriginBasePhase, step, phase) {
	if (isEmpty(OriginBasePhase)) {
		return OriginBasePhase;
	}
	let basePhase = new Date(OriginBasePhase),
		year = basePhase.getFullYear(),
		month = basePhase.getMonth(),
		date = basePhase.getDate(),
		newYear = year,
		newMonth = month,
		newDate = date,
		unit = step.slice(-1),
		stepNum = parseInt(step, 10);

	if (['y', 'Y'].includes(unit)) {
		newYear = year + stepNum * phase;
		basePhase.setFullYear(newYear);
	} else if (['m', 'M'].includes(unit)) {
		newMonth = month + stepNum * phase;
		basePhase.setMonth(newMonth);
	} else if (['w', 'W'].includes(unit)) {
		newDate = date + stepNum * 7 * phase;
		basePhase.setFullYear(newYear);
	} else if (['d', 'D'].includes(unit)) {
		newDate = date + stepNum * phase;
		basePhase.setDate(newDate);
	}

	return basePhase;
}