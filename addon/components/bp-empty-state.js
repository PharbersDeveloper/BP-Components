import Component from '@ember/component';
import layout from '../templates/components/bp-empty-state';

export default Component.extend({
	layout,
	tagName: 'section',
	classNames: ['bp-empty-state'],
	emptyTitle: 'bp-empty-state/title',
	emptyDescription: 'bp-empty-state/body',
	emptyFooter: 'bp-empty-state/footer'
});
