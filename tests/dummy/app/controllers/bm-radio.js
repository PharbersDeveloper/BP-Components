import Controller from '@ember/controller';

export default Controller.extend({
	// vertical: false,
	actions: {
		chooseItem(item) {
			if (item instanceof Array) {
				let value = '';

				for (let ele of item) {
					value += ele.value;
				}
				window.alert('您選擇的是 ' + value);

			} else {
				window.alert('您選擇的是 ' + item.id);

			}
		}
	}
});
