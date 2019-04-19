import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('string-to-array', 'helper:string-to-array', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{string-to-array inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});
