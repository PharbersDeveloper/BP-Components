import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-tabs/pane', 'Integration | Component | bp tabs/pane', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-tabs/pane}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-tabs/pane}}
      template block text
    {{/bp-tabs/pane}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
