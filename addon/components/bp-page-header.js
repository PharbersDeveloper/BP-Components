import Component from '@ember/component';
import layout from '../templates/components/bp-page-header';

export default Component.extend({
	layout,
	tagName: 'section',
	classNames: ['bp-page-header'],
	pageHeaderBody: 'bp-page-header/body',
	pageHeaderFooter: 'bp-page-header/footer'
});