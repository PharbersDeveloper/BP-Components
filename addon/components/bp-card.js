import Component from '@ember/component';
import layout from '../templates/components/bp-card';

export default Component.extend({
	layout,
	tagName: 'section',
	classNames: ['bp-card'],
	cardHeader: 'bp-card/header',
	cardBody: 'bp-card/body'
});
