import { helper } from '@ember/component/helper';

export function bpNotEq(params/*, hash*/) {
	let readyToCompareNums = params.slice(1);

	return readyToCompareNums.indexOf(params[0]) < 0;
}

export default helper(bpNotEq);
