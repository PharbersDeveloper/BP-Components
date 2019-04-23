import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-bar/maxbi', 'Integration | Component | bp bar/maxbi', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-bar/maxbi}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-bar/maxbi}}
      template block text
    {{/bp-bar/maxbi}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
