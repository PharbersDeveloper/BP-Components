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