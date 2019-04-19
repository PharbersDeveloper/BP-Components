import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export function stringToArray(params/*, hash*/) {
	let stringValue = params[0],
		symbol = params[1];

	if (isEmpty(stringValue)) {
		return stringValue;
	}

	return stringValue.split(symbol);
}

export default helper(stringToArray);
