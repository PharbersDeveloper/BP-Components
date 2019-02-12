import Controller from '@ember/controller';

export default Controller.extend({
	// vertical: false,
	actions: {
		chooseItem(item) {
			window.alert('您選擇的是 ' + item.value);
		}
	}
});
