import EmberObject from '@ember/object';
import DatepickerMixin from 'bp-components/mixins/datepicker';
import { module, test } from 'qunit';

module('Unit | Mixin | datepicker');

// Replace this with your real tests.
test('it works', function(assert) {
  let DatepickerObject = EmberObject.extend(DatepickerMixin);
  let subject = DatepickerObject.create();
  assert.ok(subject);
});
