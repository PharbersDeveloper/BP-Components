import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-dropdown-simple', 'Integration | Component | bp dropdown simple', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-dropdown-simple}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-dropdown-simple}}
      template block text
    {{/bp-dropdown-simple}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
