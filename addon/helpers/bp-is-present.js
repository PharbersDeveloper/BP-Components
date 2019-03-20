import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

export function bpIsPresent(params/*, hash*/) {
	return isPresent(params[0]);
}

export default helper(bpIsPresent);
