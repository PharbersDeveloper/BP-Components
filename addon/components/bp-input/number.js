import BpInput from 'bp-components/components/bp-input';
import layout from '../../templates/components/bp-input';
import { isEmpty } from '@ember/utils';

export default BpInput.extend({
	layout,
	onWarning() {

	},
	actions: {
		change(event) {
			let verifyNumber = /^\d+$/,
				previousValue = this.get('value'),
				maxLength = this.get('maxLength'),
				value = event.target.value,
				verify = isEmpty(event.data) ? true : verifyNumber.test(event.data);


			console.log(previousValue);
			console.log(event);
			console.log(verify);
			console.log(event.target.value);
			this.set('value', verify ? value : previousValue);
			this.set('verify', !verify);
			if (!verify) {
				this.get('onWarning')();
			}
			console.log(this.get('value'));
			event.target.value = this.get('value');
			if (maxLength !== 0) {
				this.get('onChange')(value.slice(0, maxLength));
			} else {
				this.get('onChange')(value);
			}
		}
	}
});