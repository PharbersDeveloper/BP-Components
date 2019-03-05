import Component from '@ember/component';
import layout from '../../../templates/components/bp-dropdown/menu/option';

export default Component.extend({
	layout,
	tagName: 'p',
	classNames: ['dropdown-option'],
	/**
	 * option's value
	 * @property value
	 * @type {object}
	 * @default ''
	 * @public
	 */
	value: null,
	onClick() { },
	click() {
		this.get('onClick')(this.get('value'));
	}
});
