import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-modal/header/close', 'Integration | Component | bp modal/header/close', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-modal/header/close}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-modal/header/close}}
      template block text
    {{/bp-modal/header/close}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
