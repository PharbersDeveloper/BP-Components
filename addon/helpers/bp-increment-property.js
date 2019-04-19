import { helper } from '@ember/component/helper';

export function bpIncrementProperty(params/*, hash*/) {
	let number = params[0];

	if (!isNaN(number)) {
		number = Number(number) + 1;
	}
	return number;
}

export default helper(bpIncrementProperty);
