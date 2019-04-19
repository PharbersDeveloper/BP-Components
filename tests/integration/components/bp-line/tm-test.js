import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-line/tm', 'Integration | Component | bp line/tm', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-line/tm}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-line/tm}}
      template block text
    {{/bp-line/tm}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
