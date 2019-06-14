import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export function bpPercent(params/*, hash*/) {
	if (isEmpty(params)) {
		return '';
	}
	let number = params[0],
		fixed = params[1] || 0,
		str = Number(number * 100).toFixed(fixed);

	if (Number(number) === 0) {
		return 0;
	}

	return `${str}%`;
}

export default helper(bpPercent);
