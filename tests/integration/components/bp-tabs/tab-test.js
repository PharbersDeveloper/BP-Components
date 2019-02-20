import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-tabs/tab', 'Integration | Component | bp tabs/tab', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-tabs/tab}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-tabs/tab}}
      template block text
    {{/bp-tabs/tab}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
