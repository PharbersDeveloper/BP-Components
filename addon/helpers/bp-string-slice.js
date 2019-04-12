import { helper } from '@ember/component/helper';

export function bpStringSlice(params/*, hash*/) {
	let value = params[0],
		startIndex = params[1],
		endIndex = params[2];

	if (typeof value === 'string') {
		value = value.slice(startIndex, endIndex);
	}
	return value;
}

export default helper(bpStringSlice);
