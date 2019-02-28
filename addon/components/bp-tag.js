import Component from '@ember/component';
import layout from '../templates/components/bp-tag';
import { computed } from '@ember/object';

export default Component.extend({
	layout,
	tagName: 'span',
	classNames: ['badge', 'bp-tag'],
	classNameBindings: ['currentType', 'pill:badge-pill'],
	/**
	 * Property to show type of badge
	 * @property tagType
	 * @type string
	 * @default 'open'
	 * @public
	 */
	tagType: 'open',
	currentType: computed('tagType', function () {
		let type = this.get('tagType');

		return `tag-${type}`;
	}),
	/**
	 * Property to pill badges
	 * @property pill
	 * @type boolean
	 * @default false
	 * @public
	 */
	pill: false
});
