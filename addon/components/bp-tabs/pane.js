import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { once } from '@ember/runloop';

export default Component.extend({

	classNameBindings: ['active'],

	classNames: ['tab-pane'],
	init() {
		this._super(...arguments);
		once(this, this._registerWithTabsContainer);
	},
	/**
	 * Accessed as a className binding to apply the panel's `activeClass` CSS
	 * class to the element when the panel's `isSelected` property is true.
	 *
	 * @property active
	 * @type String
	 * @readOnly
	 */
	active: computed('isSelected', function () {
		if (this.get('isSelected')) {
			return this.get('activeClass');
		}
	}),

	/**
	 * The CSS class to apply to a panel's element when its `isSelected` property
	 * is `true`.
	 *
	 * @property activeClass
	 * @type String
	 * @default 'active'
	 */
	activeClass: 'active',

	/**
	 * Tells screenreaders whether or not the panel is visible.
	 *
	 * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
	 *
	 * @property aria-hidden
	 * @type Boolean
	 * @readOnly
	 */
	'aria-hidden': computed('isSelected', function () {
		return `${!this.get('isSelected')}`;
	}).readOnly(),


	attributeBindings: ['aria-hidden', 'tabindex'],

	/**
	 * Whether or not this panel's associated tab is selected.
	 *
	 * @property isSelected
	 * @type Boolean
	 * @readOnly
	 */
	isSelected: computed('elementId', 'selection', function () {
		return this.get('elementId') === this.get('selection');
	}).readOnly(),

	/**
	 * The `bp-tabs/tab` associated with this panel.
	 *
	 * @property tab
	 * @type bp-tabs.tabComponent
	 */
	tab: computed('elementId', 'tabs.@each.selectPaneId', function () {
		const tabs = this.get('tabs');

		if (tabs) {
			return tabs.findBy('selectPaneId', this.get('elementId'));
		}
	}),

	/**
	 * Makes the selected tab keyboard tabbable, and prevents tabs from getting
	 * focus when clicked with a mouse.
	 *
	 * @property tabindex
	 * @type Number
	 */
	tabindex: computed('isSelected', function () {
		if (this.get('isSelected')) {
			return 0;
		}
	}),

	/**
	 * The array of all `bp-tabs/tab` instances within the `bp-tabs/tab-list`
	 * component.
	 *
	 * @property tabs
	 * @type Array | bp-tabs.tabComponent
	 * @readOnly
	 */
	tabs: readOnly('tabsContainer.tabList.tabs'),

	/**
	 * The `bp-tabs` component.
	 *
	 * @property tabsContainer
	 * @type bp-tabs.tabsComponent
	 * @default null
	 */
	tabsContainer: null,

	_registerWithTabsContainer() {
		this.get('tabsContainer').registerTabPanel(this);
	},

	_unregisterWithTabsContainer() {
		this.get('tabsContainer').unregisterTabPanel(this);
	},
	willDestroy() {
		this._super(...arguments);
		once(this, this._unregisterWithTabsContainer);
	}
});