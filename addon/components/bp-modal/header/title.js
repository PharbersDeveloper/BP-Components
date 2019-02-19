import Component from '@ember/component';
import layout from '../../../templates/components/bp-modal/header/title';

/**

 @class ModalHeaderTitle
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Component.extend({
	layout,
	tagName: 'h5',
	classNames: ['modal-title']
});
