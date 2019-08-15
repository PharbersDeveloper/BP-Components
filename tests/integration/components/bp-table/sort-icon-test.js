import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-table/sort-icon', 'Integration | Component | bp table/sort icon', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-table/sort-icon}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-table/sort-icon}}
      template block text
    {{/bp-table/sort-icon}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
