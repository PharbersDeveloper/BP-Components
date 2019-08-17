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
 * @param basePhase 基础值,Date类的实例
 * @param step 间隔时间（以 'M'/'Y'结尾）
 * @param phase 要format的周期,number 类型（-1，1...这种）
 * @return {Array}
 * @example 创建例子。
 * @public
 */
export function formatPhase(basePhase,step, phase) {
	if (!(basePhase instanceof Date)) {
		return basePhase;
	}

	let year = basePhase.getFullYear(),
		month = basePhase.getMonth() +1,
		date = basePhase.getDate(),
		newMonth = month,
		stepNum = 0;

	if (step.indexOf('M')>0) {
		stepNum = parseInt(step);
		newMonth=newMonth +stepNum*phase;

	}
}