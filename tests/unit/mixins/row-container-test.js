import EmberObject from '@ember/object';
import RowContainerMixin from 'bp-components/mixins/row-container';
import { module, test } from 'qunit';

module('Unit | Mixin | row container');

// Replace this with your real tests.
test('it works', function(assert) {
  let RowContainerObject = EmberObject.extend(RowContainerMixin);
  let subject = RowContainerObject.create();
  assert.ok(subject);
});
