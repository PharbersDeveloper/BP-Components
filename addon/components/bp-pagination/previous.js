import Component from '@ember/component';
import layout from '../../templates/components/bp-pagination/previous';

export default Component.extend({
	layout,
	tagName: 'li',
	classNames: ['bp-pagination-item'],
	classNameBindings: ['disabled']
});
