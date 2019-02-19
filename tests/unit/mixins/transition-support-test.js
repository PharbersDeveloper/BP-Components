import EmberObject from '@ember/object';
import TransitionSupportMixin from 'bp-components/mixins/transition-support';
import { module, test } from 'qunit';

module('Unit | Mixin | transition support');

// Replace this with your real tests.
test('it works', function(assert) {
  let TransitionSupportObject = EmberObject.extend(TransitionSupportMixin);
  let subject = TransitionSupportObject.create();
  assert.ok(subject);
});
