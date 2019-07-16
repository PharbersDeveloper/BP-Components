import EmberObject from '@ember/object';
import DashboardContainerMixin from 'bp-components/mixins/dashboard-container';
import { module, test } from 'qunit';

module('Unit | Mixin | dashboard container');

// Replace this with your real tests.
test('it works', function(assert) {
  let DashboardContainerObject = EmberObject.extend(DashboardContainerMixin);
  let subject = DashboardContainerObject.create();
  assert.ok(subject);
});
