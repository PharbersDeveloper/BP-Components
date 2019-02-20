import Component from '@ember/component';
import layout from '../templates/components/bp-tabs';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
	layout,
	classNames: ['bp-tabs'],
	listComponent: 'bp-tabs/tab-list',
	itemComponent: 'bp-tabs/item',
	panelComponent: 'bp-tabs/pane',

	/**
	 * Registers the `bp-tabs/tab-list` instance.
	 *
	 * @method registerTabList
	 * @param {bp-tabs.tab-listComponent} tabList
	 */
	registerTabList(tabList) {
		this.set('tabList', tabList);
	},

	/**
	 * Adds a panel to the `tabPanels` array.
	 *
	 * @method registerTabPanel
	 * @param {bp-tabs.panelComponent} tabPanel
	 */
	registerTabPanel(tabPanel) {
		this.get('tabPanels').pushObject(tabPanel);
	},

	/**
	 * Set this to the model of the tab you'd like to be selected. Usually it is
	 * bound to a controller property that is used as a query parameter, but can
	 * be bound to anything.
	 *
	 * @property selection
	 * @type Object
	 */
	selection: null,

	tabPanels: computed(function () {
		return A();
	}).readOnly(),

	/**
	 * Removes the `bp-tabs/tab-list` component.
	 *
	 * @method unregisterTabList
	 * @param {bp-tabs.tab-listComponent} tabList
	 */
	unregisterTabList(/* tabList */) {
		this.set('tabList', null);
	},

	/**
	 * Removes a panel from the `tabPanels` array.
	 *
	 * @method unregisterTabPanel
	 * @param {bp-tabs.panelComponent} tabPanel
	 */
	unregisterTabPanel(tabPanel) {
		this.get('tabPanels').removeObject(tabPanel);
	}
});