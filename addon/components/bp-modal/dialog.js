import Component from '@ember/component';
import layout from '../../templates/components/bp-modal/dialog';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { bind } from '@ember/runloop';
import { readOnly } from '@ember/object/computed';

/**
  Internal component for modal's markup and event handling. Should not be used directly.

  @class ModalDialog
  @namespace Components
  @extends Ember.Component
  @private
 */
export default Component.extend({
	layout,
	classNames: ['modal'],
	classNameBindings: ['fade', 'showModal:show'],
	attributeBindings: ['tabindex', 'style', 'aria-labelledby'],
	ariaRole: 'dialog',
	tabindex: '-1',
	'aria-labelledby': readOnly('titleId'),
	centered: false,
	/**
	 * Set to false to disable fade animations.
	 *
	 * @property fade
	 * @type boolean
	 * @default true
	 * @public
	 */
	fade: true,

	/**
	 * Used to apply Bootstrap's visibility classes
	 *
	 * @property showModal
	 * @type boolean
	 * @default false
	 * @private
	 */
	showModal: false,

	/**
	 * Render modal markup?
	 *
	 * @property inDom
	 * @type boolean
	 * @default false
	 * @private
	 */
	inDom: false,

	/**
	 * @property paddingLeft
	 * @type number|null
	 * @default null
	 * @private
	 */
	paddingLeft: null,

	/**
	 * @property paddingRight
	 * @type number|null
	 * @default null
	 * @private
	 */
	paddingRight: null,

	/**
	 * Closes the modal when escape key is pressed.
	 *
	 * @property keyboard
	 * @type boolean
	 * @default true
	 * @public
	 */
	keyboard: true,

	/**
	 * Property for size styling, set to null (default), 'lg' or 'sm'
	 *
	 * Also see the [Bootstrap docs](http://getbootstrap.com/javascript/#modals-sizes)
	 *
	 * @property size
	 * @type String
	 * @public
	 */
	size: null,

	/**
	 * If true clicking on the backdrop will close the modal.
	 *
	 * @property backdropClose
	 * @type boolean
	 * @default true
	 * @public
	 */
	backdropClose: true,

	/**
	 * @property style
	 * @type string
	 * @readOnly
	 * @private
	 */
	style: computed('inDom', 'paddingLeft', 'paddingRight', function () {
		let styles = [],
			{ inDom, paddingLeft, paddingRight } = this.getProperties('inDom', 'paddingLeft', 'paddingRight');

		if (inDom) {
			styles.push('display: block');
		}
		if (paddingLeft) {
			styles.push(`padding-left: ${paddingLeft}px`);
		}
		if (paddingRight) {
			styles.push(`padding-right: ${paddingRight}px`);
		}

		return htmlSafe(styles.join(';'));
	}),

	/**
	 * Name of the size class
	 *
	 * @property sizeClass
	 * @type string
	 * @readOnly
	 * @private
	 */
	sizeClass: computed('size', function () {
		let size = this.get('size');

		return isBlank(size) ? null : `modal-${size}`;
	}).readOnly(),


	/**
	* The id of the `.modal-title` element
	*
	* @property titleId
	* @type string
	* @default null
	* @private
	*/
	titleId: null,

	/**
	   * Gets or sets the id of the title element for aria accessibility tags
	   *
	   * @method getSetTitleID
	   * @private
	   */
	getOrSetTitleId() {
		//Title element may be set by user so we have to try and find it to set the id
		const modalNode = this.get('element');
		let nodeId = null;

		if (modalNode) {
			const titleNode = modalNode.querySelector('.modal-title');

			if (titleNode) {
				//Get title id of .modal-title
				nodeId = titleNode.id;
				if (!nodeId) {
					//no title id so we set one
					nodeId = `${this.get('id')}-title`;
					titleNode.id = nodeId;
				}
			}
		}
		this.set('titleId', nodeId);
	},


	/**
	 * @event onClose
	 * @public
	 */
	onClose() { },

	keyDown(e) {
		let code = e.keyCode || e.which;

		if (code === 27 && this.get('keyboard')) {
			this.get('onClose')();
		}
	},

	_click(e) {
		if (!e.target.classList.contains('modal') || !this.get('backdropClose')) {
			return;
		}
		this.get('onClose')();
	},

	didInsertElement() {
		this._super(...arguments);
		// Ember events use event delegation, but we need to add an `onclick` handler directly on the modal element for
		// iOS to allow clicking the div. So a `click(){}` method here won't work, we need to attach an event listener
		// directly to the element
		this.element.onclick = bind(this, this._click);
		this.getOrSetTitleId();
	},

	willDestroyElement() {
		this.element.onclick = null;
	}

});
