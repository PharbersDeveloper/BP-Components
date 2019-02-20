import Controller from '@ember/controller';

export default Controller.extend({
	actions: {
		search(value) {
			window.alert('you will search ' + value);
		}
	}
});
