import Controller from '@ember/controller';

export default Controller.extend({
	vertical: false,
	actions: {
		changeVertical() {
			this.toggleProperty('vertical')
		}
	}
});
