import { helper } from '@ember/component/helper';
import { formatPhaseToDate } from '../utils/chartFormat';
import { isEmpty } from '@ember/utils';

export function formatPhaseDate(params/*, hash*/) {
	if (isEmpty(params)) {
		return params;
	}
	let OriginBasePhase = params[0],
		step = params[1],
		phase = params[2]||0;

	return formatPhaseToDate(OriginBasePhase, step, phase);
}

export default helper(formatPhaseDate);
