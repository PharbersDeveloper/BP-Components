import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-pagination-mini', 'Integration | Component | bp pagination mini', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-pagination-mini}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-pagination-mini}}
      template block text
    {{/bp-pagination-mini}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
