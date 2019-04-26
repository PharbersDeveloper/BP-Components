import { helper } from '@ember/component/helper';

export function stringConcat(params/*, hash*/) {
	return ''.concat(...params);
}

export default helper(stringConcat);
