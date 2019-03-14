import EmberObject from '@ember/object';
import DropdownToggleMixin from 'bp-components/mixins/dropdown-toggle';
import { module, test } from 'qunit';

module('Unit | Mixin | dropdown toggle');

// Replace this with your real tests.
test('it works', function(assert) {
  let DropdownToggleObject = EmberObject.extend(DropdownToggleMixin);
  let subject = DropdownToggleObject.create();
  assert.ok(subject);
});
