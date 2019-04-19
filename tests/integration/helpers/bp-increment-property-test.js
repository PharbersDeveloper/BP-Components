import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-increment-property', 'helper:bp-increment-property', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{bp-increment-property inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});
