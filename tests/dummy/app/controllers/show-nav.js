import Controller from '@ember/controller';

export default Controller.extend({
	actions: {
		showSomething(value) {
			window.alert(`you will get clickd's object,like object.url = ${value.url}`)
		}
	}
});
