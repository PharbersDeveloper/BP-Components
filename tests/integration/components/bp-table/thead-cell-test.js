import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-table/thead-cell', 'Integration | Component | bp table/thead cell', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-table/thead-cell}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-table/thead-cell}}
      template block text
    {{/bp-table/thead-cell}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
