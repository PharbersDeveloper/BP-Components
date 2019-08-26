import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-table/tbody', 'Integration | Component | bp table/tbody', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-table/tbody}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-table/tbody}}
      template block text
    {{/bp-table/tbody}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
