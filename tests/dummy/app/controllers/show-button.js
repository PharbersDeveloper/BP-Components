import Controller from '@ember/controller';

export default Controller.extend({
	actions: {
		submit() {
			window.alert('click btn')
		},
		changeValue(value) {
			console.log('changeValue in controller ');
			console.log(value)
		}
	}
});
