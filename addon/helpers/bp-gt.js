import { helper } from '@ember/component/helper';

export function gt([left, right], hash) {
	let numLeft = left, numRight = right;

	if (hash.forceNumber) {
		if (typeof numLeft !== 'number') {
			numLeft = Number(numLeft);
		}
		if (typeof right !== 'number') {
			numRight = Number(right);
		}
	}
	return numLeft > numRight;
}

export default helper(gt);