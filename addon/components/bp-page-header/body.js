import Component from '@ember/component';
import layout from '../../templates/components/bp-page-header/body';

export default Component.extend({
	layout,
	pageHeaderLeft: 'bp-page-header/left',
	pageHeaderRight: 'bp-page-header/right',
	classNameBindings: ['isFooter:p-h-footer:p-h-body'],
	isFooter: false
});
