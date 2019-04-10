import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export function formatNumber(params/*, hash*/) {
	let number = params[0],
		result = '';

	if (isEmpty(number)) {
		return number;
	}
	result = number.toString().indexOf('.') !== -1 ? number.toLocaleString() : number.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
	return result;
}

export default helper(formatNumber);
