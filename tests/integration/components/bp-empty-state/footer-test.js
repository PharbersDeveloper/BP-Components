import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-empty-state/footer', 'Integration | Component | bp empty state/footer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-empty-state/footer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-empty-state/footer}}
      template block text
    {{/bp-empty-state/footer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
