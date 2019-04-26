import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-bar-line', 'Integration | Component | bp bar line', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-bar-line}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-bar-line}}
      template block text
    {{/bp-bar-line}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
