import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({
	bubble: true,
	onClick() { },
	click() {
		this.get('onClick')(this.get('active'));
		return this.get('bubble');
	}
});
