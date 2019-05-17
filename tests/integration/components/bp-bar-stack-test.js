import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-bar-stack', 'Integration | Component | bp bar stack', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-bar-stack}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-bar-stack}}
      template block text
    {{/bp-bar-stack}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
