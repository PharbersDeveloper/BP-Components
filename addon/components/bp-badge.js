import Component from '@ember/component';
import layout from '../templates/components/bp-badge';
import { computed } from '@ember/object';

export default Component.extend({
	layout,
	tagName: 'span',
	classNames: ['badge'],
	classNameBindings: ['currentType', 'pill:badge-pill'],
	/**
	 * Property to show type of badge
	 * @property type
	 * @type string
	 * @default 'primary'
	 * @public
	 */
	type: 'primary',
	currentType: computed('type', function () {
		let type = this.get('type');

		return `badge-${type}`;
	}),
	/**
	 * Property to pill badges
	 * @property pill
	 * @type boolean
	 * @default false
	 * @public
	 */
	pill: true
});
