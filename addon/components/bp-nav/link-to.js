import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({
	bubble: true,
	tagName: 'li',
	onClick() { },
	click() {
		this.get('onClick')(this.get('active'));
		return this.get('bubble');
	}
});
