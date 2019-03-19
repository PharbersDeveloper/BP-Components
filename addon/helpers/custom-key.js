import { helper } from '@ember/component/helper';

export function customKey(params/*, hash*/) {
	let item = params[0],
		key = params[1];

	return item[key];
}

export default helper(customKey);
