import BpInput from 'bp-components/components/bp-input';
import layout from '../../templates/components/bp-input';

export default BpInput.extend({
	layout,
	onWarning() { },
	actions: {
		change(event) {
			let verifyNumber = /^\d+$/,
				previousValue = this.get('value'),
				maxLength = this.get('maxLength'),
				value = event.target.value,
				verify = verifyNumber.test(event.data);


			this.set('value', verify ? value : previousValue);
			if (!verify) {
				this.get('onWarning')();
			}
			event.target.value = this.get('value');
			if (maxLength !== 0) {
				this.get('onChange')(value.slice(0, maxLength));
			} else {
				this.get('onChange')(value);
			}
		}
	}
});