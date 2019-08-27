import EmberObject from '@ember/object';
import BindingScrollMixin from 'bp-components/mixins/binding-scroll';
import { module, test } from 'qunit';

module('Unit | Mixin | binding scroll');

// Replace this with your real tests.
test('it works', function(assert) {
  let BindingScrollObject = EmberObject.extend(BindingScrollMixin);
  let subject = BindingScrollObject.create();
  assert.ok(subject);
});
