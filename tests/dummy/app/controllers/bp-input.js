import Controller from '@ember/controller';

export default Controller.extend({
	actions: {
		changeInput(value) {
			window.alert('your input value is ' + value);
		}
	}
});
