import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-input/simple', 'Integration | Component | bp input/simple', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-input/simple}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-input/simple}}
      template block text
    {{/bp-input/simple}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
