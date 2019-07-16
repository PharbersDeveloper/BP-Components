import EmberObject from '@ember/object';
import PanelMixin from 'bp-components/mixins/panel';
import { module, test } from 'qunit';

module('Unit | Mixin | panel');

// Replace this with your real tests.
test('it works', function(assert) {
  let PanelObject = EmberObject.extend(PanelMixin);
  let subject = PanelObject.create();
  assert.ok(subject);
});
