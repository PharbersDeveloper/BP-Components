import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-table/body', 'Integration | Component | bp table/body', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-table/body}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-table/body}}
      template block text
    {{/bp-table/body}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
