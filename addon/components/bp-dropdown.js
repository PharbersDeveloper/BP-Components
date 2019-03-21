import Component from '@ember/component';
import { computed } from '@ember/object';
import { bind } from '@ember/runloop';
import layout from '../templates/components/bp-dropdown';

export default Component.extend({
	layout,
	classNames: ['bp-dropdown'],
	classNameBindings: ['containerClass'],

	/**
	 * This property reflects the state of the dropdown, whether it is open or closed.
	 *
	 * @property isOpen
	 * @default false
	 * @type boolean
	 * @private
	 */
	isOpen: false,
	/**
	 * become dropdown state to disabled
	 * @property disabled
	 * @default false
	 * @type {boolean}
	 * @public
	 */
	disabled: false,
	/**
	 * By default clicking on an open dropdown menu will close it. Set this property to false for the menu to stay open.
	 *
	 * @property closeOnMenuClick
	 * @default true
	 * @type boolean
	 * @public
	 */
	closeOnMenuClick: true,

	/**
	 * By default the dropdown menu will expand downwards. Other options include, 'up', 'left' and 'right'
	 *
	 * @property direction
	 * @type string
	 * @default 'down'
	 * @public
	 */
	direction: 'down',

	/**
	 * Indicates the dropdown is being used as a navigation item dropdown.
	 *
	 * @property inNav
	 * @type boolean
	 * @default false
	 * @private
	 */
	inNav: false,

	/**
	 * A computed property to generate the suiting class for the dropdown container, either "dropdown", "dropup" or "btn-group".
	 * BS4 only: "dropleft", "dropright"
	 *
	 * @property containerClass
	 * @type string
	 * @readonly
	 * @private
	 */
	containerClass: computed('toggle.tagName', 'direction', function () {
		if (this.get('toggle.tagName') === 'button' && !this.get('toggle.block')) {
			return this.get('direction') !== 'down' ? `btn-group drop${this.get('direction')}` : 'btn-group';
		}
		return `drop${this.get('direction')}`;
	}),

	/**
	 * @property menuElement
	 * @private
	 */
	menuElement: computed(function () {
		return document.getElementById(`${this.get('elementId')}__menu`);
	}).volatile(),

	/**
	 * @property toggleElement
	 * @private
	 */
	toggleElement: computed('toggle', function () {
		return typeof FastBoot === 'undefined' ? this.get('toggle.element') || null : null;
	}),

	/**
	 * Reference to the child toggle (Toggle or Button)
	 *
	 * @property toggle
	 * @private
	 */
	toggle: null,

	/**
	 * Action is called when dropdown is about to be shown
	 *
	 * @event onShow
	 * @param {*} value
	 * @public
	 */
	onShow(value) { }, // eslint-disable-line no-unused-vars

	/**
	 * Action is called when dropdown is about to be hidden
	 *
	 * @event onHide
	 * @param {*} value
	 * @public
	 */
	onHide(value) { }, // eslint-disable-line no-unused-vars

	actions: {
		toggleDropdown() {
			if (this.get('isOpen')) {
				this.send('closeDropdown');
			} else {
				this.send('openDropdown');
			}
		},

		openDropdown() {
			this.set('isOpen', true);
			this.addClickListener();
			this.get('onShow')();
		},

		closeDropdown() {
			this.set('isOpen', false);
			this.removeClickListener();
			this.get('onHide')();
		}
	},

	addClickListener() {
		if (!this.clickListener) {
			this.clickListener = bind(this, this.closeOnClickHandler);
			document.addEventListener('click', this.clickListener, true);
		}
	},

	removeClickListener() {
		if (this.clickListener) {
			document.removeEventListener('click', this.clickListener, true);
			this.clickListener = null;
		}
	},

	willDestroyElement() {
		this._super(...arguments);
		this.removeClickListener();
	},

	/**
	 * Handler for click events to close the dropdown
	 *
	 * @method closeOnClickHandler
	 * @param e
	 * @protected
	 */
	closeOnClickHandler(e) {
		let { target } = e,
			{ toggleElement, menuElement } = this.getProperties('toggleElement', 'menuElement');

		if (!this.get('isDestroyed') &&
			(toggleElement && !toggleElement.contains(target)) &&
			(menuElement && !menuElement.contains(target) || this.get('closeOnMenuClick'))) {
			this.send('closeDropdown');
		}
	},

	/**
	 * @property buttonComponent
	 * @type {String}
	 * @private
	 */
	buttonComponent: 'bp-dropdown/button',

	/**
	 * @property toggleComponent
	 * @type {String}
	 * @private
	 */
	toggleComponent: 'bp-dropdown/toggle',

	/**
	 * @property menuComponent
	 * @type {String}
	 * @private
	 */
	menuComponent: 'bp-dropdown/menu'
});
