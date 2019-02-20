import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import { once } from '@ember/runloop';

export default Component.extend({
	tagName: 'a',
	classNameBindings: ['active'],
	classNames: ['nav-link'],

	init() {
		this._super(...arguments);
		once(this, this._registerWithTabList);
	},

	/**
	 * Accessed as a className binding to apply the tab's `activeClass` CSS class
	 * to the element when the tab's `isSelected` property is true.
	 *
	 * @property active
	 * @type String
	 * @readOnly
	 */
	active: computed('isSelected', function () {
		if (this.get('isSelected')) {
			return true;
		}
	}),

	/**
	 * The CSS class to apply to a tab's element when its `isSelected` property
	 * is `true`.
	 *
	 * @property activeClass
	 * @type String
	 * @default 'active'
	 */
	activeClass: 'item-current',

	attributeBindings: [
		'href',
		'selected',
		'tabindex'
	],

	click(event) {
		event.preventDefault();
		this.select();
	},

	href: computed('tabPanel.elementId', 'tagName', function () {
		if (this.get('tagName') !== 'a') {
			return;
		}

		return '#' + this.get('tabPanel.elementId');
	}).readOnly(),

	/**
	 * The index of this tab in the `bp-tabs/tab-list` component.
	 *
	 * @property index
	 * @type Number
	 */
	index: computed('tabs.[]', function () {
		return this.get('tabs').indexOf(this);
	}),


	/**
	 * Whether or not this tab is selected.
	 *
	 * @property isSelected
	 * @type Boolean
	 */
	isSelected: computed('tabList.selectedTab', function () {
		return this.get('tabList.selectedTab') === this;
	}),


	/**
	 * Called when the user clicks on the tab. Selects this tab.
	 *
	 * @method select
	 */
	select() {
		const onSelect = this.get('onSelect');

		if (!this.isDestroying && typeof onSelect === 'function') {
			onSelect(this.get('selectPaneId'));

		}
	},

	/**
	 * The `selected` attribute of the tab element. If the tab's `isSelected`
	 * property is `true` this will be the literal string 'selected', otherwise
	 * it will be `undefined`.
	 *
	 * @property selected
	 * @type String
	 */
	selected: computed('isSelected', function () {
		if (this.get('isSelected')) {
			return 'selected';
		}
	}),

	/**
	 * The `bp-tabs/tab-list` component this tab belongs to.
	 *
	 * @property tabList
	 * @type bp-tabs.tab-listComponent
	 * @default null
	 */
	tabList: null,

	/**
	 * The `bp-tabs/panel` associated with this tab.
	 *
	 * @property tabPanel
	 * @type bp-tabs.panelComponent
	 */
	// tabPanel: computed('tabPanels.@each.model', 'model', function () {
	// 	return this.get('tabPanels').findBy('model', this.get('model'));
	// }),
	tabPanel: computed('tabPanels.@each.elementId', 'selectPaneId', function () {
		return this.get('tabPanels').findBy('elementId', this.get('selectPaneId'));
	}),
	/**
	 * The array of all `bp-tabs/panel` instances within the `bp-tabs`
	 * component.
	 *
	 * @property tabPanels
	 * @type Array | bp-tabs.panelComponent
	 * @readOnly
	 */
	tabPanels: readOnly('tabsContainer.tabPanels'),

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
	tabs: readOnly('tabList.tabs'),

	/**
	 * The `bp-tabs` component.
	 *
	 * @property tabsContainer
	 * @type bp-tabsComponent
	 * @readOnly
	 */
	tabsContainer: readOnly('tabList.tabsContainer'),

	_registerWithTabList() {
		this.get('tabList').registerTab(this);
	},

	_unregisterWithTabList() {
		this.get('tabList').unregisterTab(this);
	},
	willDestroy() {
		this._super(...arguments);
		once(this, this._unregisterWithTabList);
	}
});