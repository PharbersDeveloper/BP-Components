import Component from '@ember/component';
import layout from '../../templates/components/bp-modal/body';

/**

 Modal body element used within [Components.Modal](Components.Modal.html) components. See there for examples.

 @class ModalBody
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Component.extend({
	layout,
	classNames: ['modal-body']
});
